import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

    @OneToMany(() => Access, access => access.role)
    access: Access[];
    
}