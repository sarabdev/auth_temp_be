import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import {  User } from '../../users/entities/user.entity'; // Adjust the path as per your project structure
import { Application } from 'src/applications/entities/application.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class Access {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
  
    @ManyToMany(() => Application)
    @JoinTable()
    applications: Application[];
  
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];
    
}
