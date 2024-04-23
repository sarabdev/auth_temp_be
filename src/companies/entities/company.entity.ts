import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Adjust the path as per your project structure
import { Application } from 'src/applications/entities/application.entity';
import { application } from 'express';
import { ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column({ unique: true, nullable: true }) // Making url optional
  url?: string;

  @Column({ nullable: true }) // Making logoUrl optional
  logoUrl?: string;

  @OneToMany(() => User, (user) => user.company)
  users?: User[];

  @ManyToMany(() => Application, (application) => application.company, {
    cascade: true,
  })
  @JoinTable()
  applications: Application[];
}
