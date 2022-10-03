"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = exports.postUser = exports.getUser = exports.getUsers = void 0;
const User_1 = require("../Entities/User");
const Book_1 = require("../Entities/Book");
const Review_1 = require("../Entities/Review");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield User_1.User.find();
    if (users) {
        if (users.length <= 0)
            return res.status(404).json();
        return res.status(200).json(users);
    }
    return res.status(400).json();
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.userID) {
        let user = yield User_1.User.findOneBy({ id: +req.params.userID });
        if (user) {
            let pastarr = [];
            let current = yield Book_1.Book.createQueryBuilder('book').where(`currentId = ${req.params.userID}`).getOne();
            const revs = yield Review_1.Review.createQueryBuilder('review')
                .where(`userid = ${req.params.userID}`).execute();
            for (const review of revs) {
                let book = yield Book_1.Book.findOneBy({ id: review.review_bookId });
                if (book) {
                    pastarr.push({ name: book.name, userScore: review.review_score });
                }
            }
            return res.status(200).json({ user: user, books: { past: pastarr, present: (current) ? { name: current.name } : null } });
        }
        return res.status(404).json();
    }
    return res.status(400).json();
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body && req.body.name) {
        let already = yield User_1.User.findOneBy({ name: req.body.name });
        // console.log({name : req.body.name})
        // console.log(already)
        if (already === null) {
            let user = new User_1.User();
            user.name = req.body.name;
            yield user.save();
            return res.status(200).json();
        }
        return res.status(400).json();
    }
});
exports.postUser = postUser;
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.userID && req.params.bookID) {
        let user = yield User_1.User.findOneBy({ id: +req.params.userID });
        let book = yield Book_1.Book.findOneBy({ id: +req.params.bookID });
        if (user && book) {
            if (book.current)
                return res.status(400).json({ error: "Book is borrowed by someone else" });
            book.current = user;
            yield book.save();
            return res.status(204).json();
        }
        return res.status(404).json();
    }
    return res.status(400).json();
});
exports.borrowBook = borrowBook;
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.userID && req.params.bookID) {
        let user = yield User_1.User.findOneBy({ id: +req.params.userID });
        let book = yield Book_1.Book.findOneBy({ id: +req.params.bookID });
        if (user && book) {
            if (req.body && req.body.score) {
                book.current = undefined;
                let rev = new Review_1.Review();
                rev.book = book;
                rev.user = user;
                rev.score = req.body.score;
                yield rev.save();
                return res.status(204).json();
            }
        }
        return res.status(404).json();
    }
    return res.status(400).json();
});
exports.returnBook = returnBook;
