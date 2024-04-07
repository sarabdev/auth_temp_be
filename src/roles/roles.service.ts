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
  create(createRoleDto: CreateRoleDto)
  {
    return 'This action adds a new role';
  }

  findAll()
  {
    return `This action returns all roles`;
  }

  async findOne(id)
  {
    try
    {
      const role = await this.rolesRepository.findOne({
        where: {
          id: id,
        }
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


  update(id: number, updateRoleDto: UpdateRoleDto)
  {
    return `This action updates a #${id} role`;
  }

  remove(id: number)
  {
    return `This action removes a #${id} role`;
  }
}
