import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { IsString } from "class-validator"
import { Book } from "./Book";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    @IsString()
    name: string;

}