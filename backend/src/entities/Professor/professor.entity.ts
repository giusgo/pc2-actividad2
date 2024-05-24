import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Professor')
export class Professor {

    @PrimaryGeneratedColumn('uuid', { name: 'professorID' })
    professorID!: number

    @Column({ type: 'varchar', length: 255, name: 'userName' })
    userName!: string

    @Column({ type: 'varchar', length: 12 })
    password!: string

}