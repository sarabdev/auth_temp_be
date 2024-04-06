import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Adjust the path as per your project structure

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url:string;

  @Column()
  logoUrl:string;

 
  @ManyToMany(() => User, user => user.applications)
  users: User[];


}

