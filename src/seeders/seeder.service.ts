import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/applications/entities/application.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private usersService: UsersService,
    private companiesService: CompaniesService,
  ) {}

  async seed() {
    try {
      // Seed applications
      const applicationsData = [
        { name: 'AUTH', url: 'http://Auth.com/', logoUrl: 'http://Auth.com/app5_logo.png' },
        { name: 'EMS', url: 'http://EMS.com/', logoUrl: 'http://Ems.com/Ems_logo.png' },
        { name: 'Samodrie', url: 'http://Samodrie.com/', logoUrl: 'http://Samodrie.com/app2_logo.png' },
        { name: 'ASCThem', url: 'http://ASCTHEM.com/', logoUrl: 'http://ASCTHEM.com/ASCTHEM_logo.png' },
        { name: 'PHARMACY_PORTAL', url: 'http://PHARMACY_PORTAL.com/', logoUrl: 'http://PHARMACY_PORTAL.com/app4_logo.png' },
       
      ];

      for (const applicationData of applicationsData) {
        const application = new Application();
        application.name = applicationData.name;
        application.url = applicationData.url;
        application.logoUrl = applicationData.logoUrl;
        await this.applicationRepository.save(application); // Save the application
      }

      console.log('Applications seeded successfully');

      // Seed roles
      const rolesData = [
        { name: 'Super_Admin', description: 'Description of Super_Admin' },
        { name: 'Auth_Admin', description: 'Description of Auth_Admin' },
        { name: 'Admin', description: 'Description of Admin' },
        { name: 'User', description: 'Description of User' },
        { name: 'Tele_Marketer', description: 'Description of Tele_Marketer' },
      ];

      for (const roleData of rolesData) {
        const role = new Role();
        role.name = roleData.name;
        role.description = roleData.description;
        await this.roleRepository.save(role); // Save the role
      }

      console.log('Roles seeded successfully');

      // Seed companies
      const companyData = {
        name: 'AuthCompany',
        address: 'AuthCompany.com',
        url: 'AuthCompany.com',
        logoUrl: 'AuthCompany.com',
        applicationIds: [1, 2, 3, 4,5],
      };

      const company = await this.companiesService.create(companyData);

      console.log('Auth Company seeded successfully');

      // Define your user data
      const userData = {
        email: 'superAdmin@gmail.com',
        userName: 'Super_Admin',
        password: 'Super123',
        company:company,
        access: [
          {
            role_id: 1,
            application_id: 1,
          },
          {
            role_id: 1,
            application_id: 2,
          },
          {
            role_id: 1,
            application_id: 3,
          },
          {
            role_id: 1,
            application_id: 4,
          },
          {
            role_id: 1,
            application_id: 5,
          },
        ],
      };

      await this.usersService.createUserBySuperAdmin(userData, company.id);

      console.log('Super_Admin seeded successfully');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}
