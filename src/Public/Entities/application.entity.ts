import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Access } from "./access.entity";
import { Company } from "./company.entity";

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  logoUrl: string;

  @OneToMany(() => Access, (access) => access.application)
  access: Access[];

  @ManyToMany(() => Company)
  company: Company[];
}
