import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { Access } from '../Public/Entities/access.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationsService } from '../applications/applications.service';
import { RolesService } from 'src/roles/roles.service';
import { Application } from '../Public/Entities/application.entity';
import { Role } from 'src/Public/Entities/roles.entity';
import { User } from 'src/Public/Entities/user.entity';

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
    access.application = application; 
    access.role = role; 

      return await this.accessRepository.save(access);
     } catch (error) {
      throw error;
     } 
    
  }

  async edit(id: number, editAccessDto: any) {
    try {
      // Find the access entry to edit
      const access = await this.accessRepository.findOne({where:{id},  relations: ['user', 'application', 'role'] });
  
      if (!access) {
        throw new NotFoundException(`Access with ID ${id} not found`);
      }
  
      // Update access properties
      if (editAccessDto.role_id) {
        const role = await this.rolesService.findOne(editAccessDto.role_id);
        if (!role) {
          throw new NotFoundException(`Role with ID ${editAccessDto.role_id} not found`);
        }
        access.role = role;
      }
  
      if (editAccessDto.application_id) {
        const application = await this.applicationService.findOne(editAccessDto.application_id);
        if (!application) {
          throw new NotFoundException(`Application with ID ${editAccessDto.application_id} not found`);
        }
        access.application = application;
      }
  
      // Save the updated access to the database
      return await this.accessRepository.save(access);
    } catch (error) {
      throw error;
    }
  }
  
  async findAll() {
    try {
      const access = await this.accessRepository.find({

        relations: {
            role: true,
            application: true,
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
          role: true,
            application: true,
          
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
