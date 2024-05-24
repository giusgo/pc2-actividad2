import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Student')
export class Student {

    @PrimaryGeneratedColumn('uuid', { name: 'studentID' })
    studentID!: number

    @Column({ type: 'varchar', length: 255, name: 'userName' })
    userName!: string

    @Column({ type: 'float' })
    grade!: number
    
}