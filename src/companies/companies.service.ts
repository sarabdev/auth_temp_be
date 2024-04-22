import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationsService } from '../applications/applications.service';
import { Public } from 'src/auth/constants';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private applicationsService: ApplicationsService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const { name, address, url, logoUrl, applicationIds } = createCompanyDto;
      const existingCompany = await this.companyRepository.findOne({
        where: {
          name: name,
          url: url,
        },
      });

      if (existingCompany) {
        throw new BadRequestException("This Company Name is Already Reserved");
      } else {
        // Create a new company instance
        const company = new Company();
        company.name = name;
        company.address = address;
        company.url = url;
        company.logoUrl = logoUrl;

        // Find applications by IDs
        const applications =
          await this.applicationsService.findByApplicationIds(applicationIds);

        // Assign applications to the company
        company.applications = applications;

        // Save the company to the database
        return this.companyRepository.save(company);
      }
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.companyRepository.find({
        relations: ['applications'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const company = await this.companyRepository.findOne({ where: { id } });
      return company;
    } catch (error) {
      throw error;
    }
  }
}
