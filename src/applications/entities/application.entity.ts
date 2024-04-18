import { Entity, Column, PrimaryGeneratedColumn, ManyToMany ,JoinTable} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Adjust the path as per your project structure
import { Access } from 'src/access/entities/access.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url:string;

  @Column()
  logoUrl:string;

  @ManyToMany(() => Access)
  @JoinTable()
  access: Access[];

}

