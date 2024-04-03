import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {  CreateUserDto } from './dto/create-userdto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../password/password.service';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private companiesService:CompaniesService,
    private passwordService:PasswordService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id) {

    const result = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    }
     );
    if (result) {
      return result;
    } else {
      throw new BadRequestException('User doesnt Exists');
    }
  }

  async findExistingByEmail(email: string) {
    const result = await this.usersRepository.findOne({
      where: {
        email: email,
      },
      relations:['company'],
    });
    if (result) {
    
      return result;
    }
  }

  async findOneByEmail(email: string) {
    const result = await this.usersRepository.findOne({
      where: {
        email: email,
      }
    });
    if (result) {
    
      return result;
    } else {
      throw new BadRequestException('User doesnt Exists');
    }
  }


  async createUserBySuperAdmin(
    createUserDto: CreateUserDto,
    companyId: number,
  ) {
    const company = await this.companiesService.findOne(companyId);
  
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }
else{
  const hash= await this.passwordService.hashPassword(createUserDto.password);
  createUserDto.password=hash;
    const User = this.usersRepository.create({
      ...createUserDto,
      company: company, // Assign the company to the user
    });
    return await this.usersRepository.save(User);
  }
}
  
 
async createUserByAdmin(
  createUserDto: CreateUserDto,
  companyId: number,
): Promise<User> {

  if(createUserDto.roles!=="user"){
    throw new UnauthorizedException("Unauthorized To Create User With This Role.");
    
  }
  else{
  
  const company = await this.companiesService.findOne(companyId);

  if (!company) {
    throw new NotFoundException(`Company with ID ${companyId} not found`);
  }
else{
const hash= await this.passwordService.hashPassword(createUserDto.password);
createUserDto.password=hash;
  const user = this.usersRepository.create({
    ...createUserDto,
    company: company, // Assign the company to the user
  });
  return await this.usersRepository.save(user);
}
}

}


}