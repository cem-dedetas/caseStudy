import express from "express";
import { DataSource } from "typeorm"
import { Book } from "./Entities/Book";
import { Review } from "./Entities/Review";
import { User } from "./Entities/User";
import { BookRouter } from "./Routes/BookRoutes";
import { UserRouter } from "./Routes/UserRoutes";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "xqwz2401",
    database: "caseStudy",
    entities:[User,Book,Review]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const app = express();

app.use(express.json())

app.use('/users', UserRouter)
app.use('/books', BookRouter)

const PORT = "3000"

app.listen(PORT, ():void=>{
    console.log(`Server up at ${PORT}`);
})