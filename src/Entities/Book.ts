import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import {IsString} from "class-validator"
import { User } from "./User";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsString()
    name:string;

    @OneToOne(()=>User,{ nullable: true })
    @JoinColumn()
    current:User | null;
}