import express from "express"
import { getUsers, postUser, getUser, borrowBook, returnBook} from "../Controllers/UserController"
import { User } from "../Entities/User"
export const UserRouter = express.Router()


UserRouter.get('/', getUsers)
UserRouter.get('/:userID', getUser)
UserRouter.post('/:userID/borrow/:bookID', borrowBook)
UserRouter.post('/:userID/return/:bookID', returnBook)
UserRouter.post('/',postUser)
