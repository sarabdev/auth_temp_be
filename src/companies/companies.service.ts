import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
    
  constructor(  
    @InjectRepository(Company)
  private companyRepository: Repository<Company>){
  }

async  create(createCompanyDto: CreateCompanyDto) {
   try {
    return await this.companyRepository.save(createCompanyDto);
   } catch (error) {
    throw error;
   } 
  }

  async findAll() {
   try {
    return await this.companyRepository.find();
    
   } catch (error) {
    throw error;
   }
  }

  async findOne(id: number) {
    try {
      
    const company = await this.companyRepository.findOne({where:{id}});
    return company;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
