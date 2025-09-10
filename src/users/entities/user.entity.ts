import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    name: string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
    })
    email: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    password: string

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date
}
