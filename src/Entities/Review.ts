import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import {IsString} from "class-validator"
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Book)
    book:Book

    @Column()
    @IsString()
    score:string;

    @ManyToOne(() => User)
    user:User
}