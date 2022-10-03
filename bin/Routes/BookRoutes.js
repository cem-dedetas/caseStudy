"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const BookController_1 = require("../Controllers/BookController");
exports.BookRouter = express_1.default.Router();
exports.BookRouter.get('/', BookController_1.getBooks);
exports.BookRouter.get('/:bookID', BookController_1.getBook);
exports.BookRouter.post('/', BookController_1.postBook);
