import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { Access } from './entities/access.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationsService } from '../applications/applications.service';
import { RolesService } from 'src/roles/roles.service';
import { Application } from '../applications/entities/application.entity';
import { Role } from '../roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AccessService {
    
  constructor(  
    @InjectRepository(Access)
  private accessRepository: Repository<Access>,
  @InjectRepository(User)
  private userRepository: Repository<User>,
  private applicationService:ApplicationsService,
  private rolesService: RolesService,
){
  }

  async create(createAccessDto: CreateAccessDto) {
    try {
    let role= await this.rolesService.findOne(createAccessDto.role_id);
    let application= await this.applicationService.findOne(createAccessDto.application_id);
   
    const user = await this.userRepository.findOne({
      where: {
        id: createAccessDto.user_id,
      }
    });


  let access= new Access();
    access.user = [user]; 
    access.applications = [application]; 
    access.roles = [role]; 

      return await this.accessRepository.save(access);
     } catch (error) {
      throw error;
     } 
    
  }

  async findAll() {
    try {
      const access = await this.accessRepository.find({

        relations: {
            roles: true,
            applications: true,
          user:true
        },
      });
      return access; 
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
      const access = await this.accessRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user:true ,
          roles: true,
            applications: true,
          
        },
      });
      if (access) {
        return access;
      } else {
        throw new BadRequestException('Access doesnt Exists');
      }
    } catch (error) {
      throw error;
    }
  }


}
