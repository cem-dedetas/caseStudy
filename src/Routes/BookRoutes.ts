import express from "express"
import { getBooks, getBook, postBook } from "../Controllers/BookController"
export const BookRouter = express.Router()


BookRouter.get('/', getBooks)
BookRouter.get('/:bookID', getBook)
BookRouter.post('/',postBook)
