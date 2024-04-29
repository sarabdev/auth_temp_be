import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, Length } from "class-validator";
import Platform from "./platform.entity";
import { Access } from "./access.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(1, 255)
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Access, (access) => access.role)
  access: Access[];

  @ManyToOne(() => Platform, { nullable: true })
  @JoinColumn()
  platform: Platform;

  @Column()
  platformId: number;
}

export default Role;
