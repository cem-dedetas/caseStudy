"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Book_1 = require("./Entities/Book");
const Review_1 = require("./Entities/Review");
const User_1 = require("./Entities/User");
const BookRoutes_1 = require("./Routes/BookRoutes");
const UserRoutes_1 = require("./Routes/UserRoutes");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "xqwz2401",
    database: "caseStudy",
    entities: [User_1.User, Book_1.Book, Review_1.Review]
});
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/users', UserRoutes_1.UserRouter);
app.use('/books', BookRoutes_1.BookRouter);
const PORT = "3000";
app.listen(PORT, () => {
    console.log(`Server up at ${PORT}`);
});
