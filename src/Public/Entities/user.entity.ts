import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Transform } from "class-transformer";
import { Access } from "./access.entity";
import { Company } from "./company.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsString()
  @Length(1, 255)
  last_name: string;

  @Column({ nullable: true })
  @IsString()
  @Length(1, 255)
  first_name: string;

  @Column({ nullable: true })
  @IsString()
  @Length(1, 255)
  name: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  @Transform(({ value }) => (value || "").toString())
  @IsString()
  @Length(10, 20)
  @IsNotEmpty()
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ default: null, nullable: true })
  token: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true, type: 'timestamp' })
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Access, (access) => access.user)
  @JoinTable()
  access: Access[];

  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  company: Company | null;


}
