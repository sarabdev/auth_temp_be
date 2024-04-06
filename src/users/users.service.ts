import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-userdto';
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
    private companiesService: CompaniesService,
    private passwordService: PasswordService,
  ) {}

  async findAll() {
    try {
      const user = await this.usersRepository.find();
      // Transform each user object to remove the password field
      return user.map(({ password, ...user }) => user);
    } catch (error) {
      throw error;
    }
  }

  async findAllByAdmin(companyId) {
    try {
      const user = await this.usersRepository.find({
        where: {
          company: companyId,
        },
        relations: ['company'],
      });
      // Transform each user object to remove the password field
      return user.map(({ password, ...user }) => user);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: id,
        },
        relations: ['company'],
      });
      if (user) {
        // Destructure the password field and return the modified user object
        const { password, ...modifiedUser } = user;
        return modifiedUser;
      } else {
        throw new BadRequestException('User doesnt Exists');
      }
    } catch (error) {
      throw error;
    }
  }

  async findExistingByEmail(email: string) {
    try {
      const result = await this.usersRepository.findOne({
        where: {
          email: email,
        },
        relations: ['company'],
      });
      if (result) {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const result = await this.usersRepository.findOne({
        where: {
          email: email,
        },
        relations: ['company'],
      });
      if (result) {
        // Destructure the password field and return the modified user object
        const { password, ...modifiedUser } = result;
        return modifiedUser;
      } else {
        throw new BadRequestException('User doesnt Exists');
      }
    } catch (error) {
      throw error;
    }
  }

  async createUserBySuperAdmin(
    createUserDto: CreateUserDto[],
    companyId: number,
  ) {
    try {
      const company = await this.companiesService.findOne(companyId);

      if (!company) {
        throw new NotFoundException(`Company with ID ${companyId} not found`);
      }

      const hashedUsers = await Promise.all(
        createUserDto.map(async (dto) => {
          const hash = await this.passwordService.hashPassword(dto.password);
          return { ...dto, password: hash, company: company };
        }),
      );

      const createdUsers = await this.usersRepository.save(hashedUsers);

      // Destructure the password field and return the modified user objects
      const modifiedUsers = createdUsers.map(({ password, ...user }) => user);

      return modifiedUsers;
    } catch (error) {
      throw error;
    }
  }


  async createUserByAdmin(createUserDto: CreateUserDto, companyId: number) {
    try {
      if (createUserDto.roles === 'user'|| createUserDto.roles === 'telemarketer') {
        
        const company = await this.companiesService.findOne(companyId);

        if (!company) {
          throw new NotFoundException(`Company with ID ${companyId} not found`);
        } else {
          const hash = await this.passwordService.hashPassword(
            createUserDto.password,
          );
          createUserDto.password = hash;
          const user = this.usersRepository.create({
            ...createUserDto,
            company: company, // Assign the company to the user
          });
          const user1 = await this.usersRepository.save(user);
          // Destructure the password field and return the modified user object
          const { password, ...modifiedUser } = user1;
          return modifiedUser;
        }
      }
      else {
      throw new UnauthorizedException(
        'Unauthorized To Create User With This Role.',
      );
    } 

    } catch (error) {
      throw error;
    }
  }

  async createUserByAuthAdmin(createUserDto: CreateUserDto, companyId: number) {
    try {
      if (createUserDto.roles === 'super_admin') {
        throw new UnauthorizedException(
          'Unauthorized To Create User With This Role.',
        );
      }
      else {
      
        const company = await this.companiesService.findOne(companyId);

        if (!company) {
          throw new NotFoundException(`Company with ID ${companyId} not found`);
        } else {
          const hash = await this.passwordService.hashPassword(
            createUserDto.password,
          );
          createUserDto.password = hash;
          const user = this.usersRepository.create({
            ...createUserDto,
            company: company, // Assign the company to the user
          });
          const user1 = await this.usersRepository.save(user);
          // Destructure the password field and return the modified user object
          const { password, ...modifiedUser } = user1;
          return modifiedUser;
        }
     
    } 

    } catch (error) {
      throw error;
    }
  }


}


