"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../Controllers/UserController");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.get('/', UserController_1.getUsers);
exports.UserRouter.get('/:userID', UserController_1.getUser);
exports.UserRouter.post('/:userID/borrow/:bookID', UserController_1.borrowBook);
exports.UserRouter.post('/:userID/return/:bookID', UserController_1.returnBook);
exports.UserRouter.post('/', UserController_1.postUser);
