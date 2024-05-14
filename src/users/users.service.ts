import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { ApplicationsService } from 'src/applications/applications.service';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { PasswordService } from '../password/password.service';
import { CreateUserDto } from './dto/create-userdto';
import { User } from '../Public/Entities/user.entity';
import { AccessService } from '../access/access.service';
import { access } from 'fs';
import { application } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private companiesService: CompaniesService,
    private passwordService: PasswordService,
    private rolesService: RolesService,
    private applicationService: ApplicationsService,
    private accessService: AccessService,
  ) {}

  async findAll() {
    try {
      const user = await this.usersRepository.find({
        relations: {
          company: true,
          access: {
            role: true,
            application: true,
          },
        },
      });
      // Transform each user object to remove the password field
      return user.map(({ password, ...user }) => user);
    } catch (error) {
      throw error;
    }
  }

  async findAllByAdmin(companyId) {
    try {
      const user = await this.usersRepository.find({
        where: { company: { id: companyId } },
        

        relations: {
          company: true,
          access: {
            role: true,
            application: true,
          },
        },
      });
      // Transform each user object to remove the password field
      return user.map(({ password, ...user }) => user);
    } catch (error) {
      throw error;
    }
  }


  async findAllByAuth_Admin(companyId) {
    try {
      
      const user = await this.usersRepository.find({
        where: { company: { id: companyId } },
        

        relations: {
          company: true,
          access: {
            role: true,
            application: true,
          },
        },
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
        relations: {
          company: true,
          access: {
            role: true,
            application: true,
          },
        },
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

  async findOneWithPassword(id) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          company: true,
          access: {
            role: true,
            application: true,
          },
        },
      });
      if (user) {
        return user;
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
        relations: {
          company: true,
          access: {
            role: true,
            application: true,
          },
        },
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
        relations: {
          company: true,
          access: {
            role: true,
            application: true,
          },
        },
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
    createUserDto: CreateUserDto,
    companyId: number,
  ) {
    try {
      const existingUser = await this.findExistingByEmail(createUserDto.email);
      if (existingUser) {
        throw new BadRequestException(
          'A user with this Email Adress Already Exists',
        );
      } else {
        const company = await this.companiesService.findOne(companyId);

        if (!company) {
          throw new NotFoundException(`Company with ID ${companyId} not found`);
        }

        const hash = await this.passwordService.hashPassword(
          createUserDto.password,
        );

        const data = {
          email: createUserDto.email,
          userName: createUserDto.userName,
          password: hash,
          company: company,
        };

        const createdUser = await this.usersRepository.save(data);
        let createAccess;
        const createdAccessArray = [];
        for (let i = 0; i < createUserDto.access.length; i++) {
          const element = createUserDto.access[i];

          let acessData = {
            user_id: createdUser.id,
            role_id: element.role_id,
            application_id: element.application_id,
          };
          createAccess = await this.accessService.create(acessData);
console.log("createAcess",createAccess);

          createdAccessArray.push(createAccess);
        }

        createdUser.access = createdAccessArray;
        // Update user data with access array
        const updatedUser = await this.usersRepository.save(createdUser);

        // Destructure the password field and return the modified user objects
        ({ password, ...updatedUser }) => updatedUser;

        return updatedUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async editUserBySuperAdmin(userId: number, editUserDto: any) {
    try {
      const user = await this.usersRepository.findOne({where:{id:userId},  relations: ['access'] });
  
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      // Check if the email is already used by another user
      if (editUserDto.email && editUserDto.email !== user.email) {
        const existingUser = await this.findExistingByEmail(editUserDto.email);
        if (existingUser) {
          throw new BadRequestException('A user with this Email Address already exists');
        }
      }
  
      // Update user properties
      if (editUserDto.email) user.email = editUserDto.email;
      if (editUserDto.userName) user.userName = editUserDto.userName;
      if (editUserDto.selectedCompany) user.company= editUserDto.selectedCompany
      // if (editUserDto.password) {
      //   const hash = await this.passwordService.hashPassword(editUserDto.password);
      //   user.password = hash;
      // }
  
      // Update access array if provided
      if (editUserDto.access) {
        const updatedAccessArray = [];
        for (const accessData of editUserDto.access) {
          let access = user.access.find(a => a.id === accessData.id);
          if (access) {
            // Find the corresponding role and application objects
            const role = await this.rolesService.findOne(accessData.role_id);
            const application = await this.applicationService.findOne(accessData.application_id);
      
            if (!role || !application) {
              // Handle error if role or application is not found
              throw new NotFoundException(`Role or Application not found for access ID ${accessData.id}`);
            }
      
            // Assign the found role and application to the access entry
            access.role = role;
            access.application = application;
      
            // Save the updated access entry
            const updatedAccess = await this.accessService.edit(access.id, access);
            updatedAccessArray.push(updatedAccess);
          }
        }
        user.access = updatedAccessArray;
      }
      
  
      // Save the updated user to the database
      const updatedUser = await this.usersRepository.save(user);
  
      // Destructure the password field and return the modified user object
      const { password, ...result } = updatedUser;
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async createUserByAuthAdmin(createUserDto: CreateUserDto, companyId: number) {
    try {
      // if (createUserDto.roles === 'super_admin') {
      //   throw new UnauthorizedException(
      //     'Unauthorized To Create User With This Role.',
      //   );
      // }
      // else {

      const existingUser = await this.findExistingByEmail(createUserDto.email);
      if (existingUser) {
        throw new BadRequestException(
          'A user with this Email Adress Already Exists',
        );
      } else {
        const company = await this.companiesService.findOne(companyId);

        if (!company) {
          throw new NotFoundException(`Company with ID ${companyId} not found`);
        } else {
          const hash = await this.passwordService.hashPassword(
            createUserDto.password,
          );
          createUserDto.password = hash;

          const data = {
            email: createUserDto.email,
            userName: createUserDto.userName,
            password: hash,
            company: company,
          };

          const createdUser = await this.usersRepository.save(data);
          let createAccess;
          const createdAccessArray = [];
          for (let i = 0; i < createUserDto.access.length; i++) {
            const element = createUserDto.access[i];

            let acessData = {
              user_id: createdUser.id,
              role_id: element.role_id,
              application_id: element.application_id,
            };
            createAccess = await this.accessService.create(acessData);

            createdAccessArray.push(createAccess);
          }

          createdUser.access = createdAccessArray;
          // Update user data with access array
          const updatedUser = await this.usersRepository.save(createdUser);

          // Destructure the password field and return the modified user objects
          ({ password, ...updatedUser }) => updatedUser;

          return updatedUser;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
