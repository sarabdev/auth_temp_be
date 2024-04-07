import
{
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Access } from '../../access/entities/access.entity';
import { Application } from '../../applications/entities/application.entity';
import { Company } from '../../companies/entities/company.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User
{
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
