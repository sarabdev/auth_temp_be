import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService
{
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) { }
 async create(createRoleDto: CreateRoleDto)
  {
    try{
 return await this.rolesRepository.save(createRoleDto);
    }
    catch(error){
throw error;
    }
  }

 async findAll()
  {
    try
    {
      const role = await this.rolesRepository.find({
       relations:{access:true}
      });
      if (role)
      {

        return role;
      } else
      {
        throw new BadRequestException('Role doesnt Exists');
      }
    } catch (error)
    {
      throw error;
    }
  }

  async findOne(id)
  {
    try
    {
      const role = await this.rolesRepository.findOne({
        where: {
          id: id,
          
        },
        relations:{access:true}
      });
      if (role)
      {

        return role;
      } else
      {
        throw new BadRequestException('Role doesnt Exists');
      }
    } catch (error)
    {
      throw error;
    }
  }


}
