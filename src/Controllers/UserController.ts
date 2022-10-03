import { User } from "../Entities/User";
import { Request,Response } from "express";
import { Book } from "../Entities/Book";
import { Review } from "../Entities/Review";


export const getUsers = async (req: Request,res: Response)=>{
    let users = await User.find()
    if(users){
        if(users.length<=0) return res.status(404).json()
        return res.status(200).json(users)
    }

    return res.status(400).json()
}

export const getUser = async (req: Request,res: Response)=>{
    if(req.params.userID){
        let user = await User.findOneBy({id : +req.params.userID})
        if(user){
            let pastarr:any[] = []
            let current = await Book.createQueryBuilder('book').where(`currentId = ${req.params.userID}`).getOne()
            
            const revs:any[] = await Review.createQueryBuilder('review')
            .where(`userid = ${req.params.userID}`).execute()

            
            for (const review of revs) {
                let book = await Book.findOneBy({id:review.review_bookId})
                if(book){
                    pastarr.push({name:book.name, userScore:review.review_score})
                }
            }
            
            return res.status(200).json({user:user,books:{past:pastarr, present:(current)?{name : current.name}:null}})
        }
        return res.status(404).json()
    }

    return res.status(400).json()
}

export const postUser = async (req: Request,res: Response)=>{
    if(req.body && req.body.name){
        let already = await User.findOneBy({name : req.body.name})
        // console.log({name : req.body.name})
        // console.log(already)
        if(already===null){
            let user = new User();
            user.name=req.body.name;
            await user.save();
            return  res.status(200).json()
        }
        return res.status(400).json()
    }
    
}

export const borrowBook = async (req: Request,res: Response) =>{
    if(req.params.userID && req.params.bookID){
        let user = await User.findOneBy({id : +req.params.userID})
        //let book = await Book.findOneBy({id : +req.params.bookID})
        let query = await Book.createQueryBuilder('book').where(`id = ${req.params.bookID}`).getRawAndEntities()
        let currentId = (query.raw.length>0)?query.raw[0].book_currentId:null;
        let book:Book|null = (query.entities.length>0)?query.entities[0]:null;
        if(user && book){
            //console.log(currentId)
            if(currentId !== null) return res.status(400).json({error:"Book is borrowed by someone else"})
            book.current = user;
            await book.save()
            return res.status(204).json()
        }
        return res.status(404).json()
    }

    return res.status(400).json()
}

export const returnBook = async (req: Request,res: Response) =>{
    if(req.params.userID && req.params.bookID){
        let user = await User.findOneBy({id : +req.params.userID})
        let book = await Book.findOneBy({id : +req.params.bookID})
        if(user && book){
            if(req.body && req.body.score){
                book.current = null;
                let rev = new Review();
                rev.book=book;
                rev.user=user;
                rev.score=req.body.score;
                await rev.save()
                //console.log(await book.save())
                //console.log(book)
                return res.status(204).json()
            }
        }
        return res.status(404).json()
    }

    return res.status(400).json()
}