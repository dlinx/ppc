import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

interface IEmployee {
    uid: number,
    email: string,
    password: string,
    name: string,
    isAdmin: boolean
}

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    isAdmin: boolean;

    constructor({ uid, email, password, name, isAdmin }: IEmployee) {
        this.uid = uid
        this.email = email
        this.password = password
        this.name = name
        this.isAdmin = isAdmin
    }
}