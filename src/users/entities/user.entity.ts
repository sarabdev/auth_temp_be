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
import { Company } from '../../companies/entities/company.entity';

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

  @ManyToMany(() => Access, (access)=> access.user)
  @JoinTable()
  access: Access[];


  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  company: Company | null;
}
