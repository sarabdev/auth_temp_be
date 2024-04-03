import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Company } from '../../companies/entities/company.entity'; 

export enum Role {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  roles: Role;

  @ManyToOne(() => Company, company => company.users, { nullable: true })
  company: Company| null;
  
}