import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

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

