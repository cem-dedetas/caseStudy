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
exports.postBook = exports.getBook = exports.getBooks = void 0;
const Book_1 = require("../Entities/Book");
const Review_1 = require("../Entities/Review");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let books = yield Book_1.Book.find();
    if (books) {
        if (books.length <= 0)
            return res.status(404).json();
        return res.status(200).json(books);
    }
    return res.status(400).json();
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.bookID) {
        let book = yield Book_1.Book.findOneBy({ id: +req.params.bookID });
        let rev = yield Review_1.Review.createQueryBuilder('review')
            .where(`bookid = ${req.params.bookID}`)
            .getMany();
        if (rev.length > 0) {
            let total = 0;
            rev.map(x => total += +x.score);
            if (book)
                return res.status(200).json({ id: book.id, name: book.name, score: total / rev.length });
            return res.status(404).json();
        }
        if (book)
            return res.status(200).json({ id: book.id, name: book.name, score: -1 });
        return res.status(404).json();
    }
    return res.status(400).json();
});
exports.getBook = getBook;
const postBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body && req.body.name) {
        let already = yield Book_1.Book.findOneBy({ name: req.body.name });
        // console.log({name : req.body.name})
        // console.log(already)
        if (already === null) {
            let book = new Book_1.Book();
            book.name = req.body.name;
            yield book.save();
            return res.status(200).json();
        }
        return res.status(400).json();
    }
});
exports.postBook = postBook;
