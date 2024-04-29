import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Application } from './application.entity';
import Role from './roles.entity';
import { User } from './user.entity';

@Entity()
export class Access {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.access, { cascade: true })
  user: User[];

  @ManyToOne(() => Application, application => application.access)
  application: Application;

  
  @ManyToOne(() => Role, role => role.access)
  role: Role;

}
