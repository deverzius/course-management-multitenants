import { UUID } from "crypto";
import { ROLE } from "src/constants";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
    constructor(partial: Partial<User>) { 
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn("uuid")
    id: UUID;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({default: ROLE.LEARNER})
    role: ROLE;

    @Column({default: ""})
    description: string;
}