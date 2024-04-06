import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany , JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Adjust the path as per your project structure
import { Access } from 'src/access/entities/access.entity';
import { Application } from 'src/applications/entities/application.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
  
    @ManyToMany(() => Application)
    @JoinTable()
    applications: Application[];
  
    @ManyToMany(() => Access)
    @JoinTable()
    access: Access[];
}