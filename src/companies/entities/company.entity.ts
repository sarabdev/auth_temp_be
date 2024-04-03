import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Adjust the path as per your project structure

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  url:string;

  @Column()
  logoUrl:string;

  @OneToMany(() => User, user => user.company)
  users?: User[];
}
