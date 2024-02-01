import { UUID } from "crypto";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tenants")
export class Tenant {
    constructor(partial: Partial<Tenant>) { 
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

    @Column({default: ""})
    description: string;
}