import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { ScanningDetails } from "./scandetails.entity";
import { Application } from "./application.entity";
import { User } from "./user.entity";
import { Products } from "./products.entity";

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

  @OneToMany(() => Products, (products) => products.company)
  products?: Products[];
}
