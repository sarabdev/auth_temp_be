import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable  } from 'typeorm';
import { Company } from '../../companies/entities/company.entity'; 
import { Application } from 'src/applications/entities/application.entity';

export enum Role {
  AUTH_ADMIN= 'auth_admin',
  TELEMARKETER='telemarketer',
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
  
  @ManyToMany(() => Application, application => application.users)
  @JoinTable()
  applications: Application[];
}
