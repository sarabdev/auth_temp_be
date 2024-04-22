import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Adjust the path as per your project structure
import { Application } from 'src/applications/entities/application.entity';
import { application } from 'express';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  @Column()
  url:string;

  @Column()
  logoUrl:string;

  @OneToMany(() => User, user => user.company)
  users?: User[];

  @OneToMany(() => Application, application => application.company)
  applications: Application[];
}
