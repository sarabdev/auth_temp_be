import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Access } from '../../access/entities/access.entity';
import { Application } from '../../applications/entities/application.entity';
import { User } from '../../users/entities/user.entity'; // Adjust the path as per your project structure

@Entity()
export class Role
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Access)
    @JoinTable()
    access: Access[];
}