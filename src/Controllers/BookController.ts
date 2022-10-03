import { Book } from "../Entities/Book";
import { Request, Response } from "express";
import { Review } from "../Entities/Review";


export const getBooks = async (req: Request, res: Response) => {
    let books = await Book.find()
    if (books) {
        if (books.length <= 0) return res.status(404).json()
        return res.status(200).json(books)
    }

    return res.status(400).json()
}

export const getBook = async (req: Request, res: Response) => {
    if (req.params.bookID) {
        let book = await Book.findOneBy({ id: +req.params.bookID })
        let rev = await Review.createQueryBuilder('review')
            .where(`bookid = ${req.params.bookID}`)
            .getMany()

        if (rev.length > 0) {
            let total = 0;
            rev.map(x => total += +x.score)
            if (book) return res.status(200).json({ id: book.id, name: book.name, score: total / rev.length })
            return res.status(404).json()
        }
        if (book) return res.status(200).json({ id: book.id, name: book.name, score: -1})
        return res.status(404).json()
    }

    return res.status(400).json()
}

export const postBook = async (req: Request, res: Response) => {
    if (req.body && req.body.name) {
        let already = await Book.findOneBy({ name: req.body.name })
        // console.log({name : req.body.name})
        // console.log(already)
        if (already === null) {
            let book = new Book();
            book.name = req.body.name;
            await book.save();
            return res.status(200).json()
        }
        return res.status(400).json()
    }

}
