import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from '../reports/report.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('inserted user', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('removed user', this.id)
    }
}

