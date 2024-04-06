import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Application } from 'src/applications/entities/application.entity';
import { Access } from 'src/access/entities/access.entity';
import { Role } from 'src/roles/entities/role.entity';

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

  @ManyToMany(() => Application)
  @JoinTable()
  applications: Application[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Access)
  @JoinTable()
  access: Access[];

  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  company: Company | null;
}
