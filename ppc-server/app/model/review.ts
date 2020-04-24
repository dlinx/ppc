import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Employee } from './employee';

interface IReview {
    rid: string,
    responsibility: number,
    learningAbility: number,
    creativity: number,
    punctuality: number,
    communication: number,
    comments: string,
    from: Employee,
    to: Employee,
}

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    rid: string;

    @Column("varchar", { length: 50 })
    responsibility: number

    @Column("tinyint")
    learningAbility: number

    @Column("tinyint")
    creativity: number

    @Column("tinyint")
    punctuality: number

    @Column("tinyint")
    communication: number

    @Column("varchar", { length: 200 })
    comments: string

    @ManyToOne(Type => Employee, e => e.uid)
    from: Employee

    @ManyToOne(Type => Employee, e => e.uid)
    to: Employee

    constructor(params: IReview) {
        this.rid = params.rid
        this.responsibility = params.responsibility
        this.learningAbility = params.learningAbility
        this.creativity = params.creativity
        this.punctuality = params.punctuality
        this.communication = params.communication
        this.comments = params.comments
        this.from = params.from
        this.to = params.to
    }
}