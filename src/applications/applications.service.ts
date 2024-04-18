import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    try {
      return await this.applicationRepository.create(createApplicationDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const application = await this.applicationRepository.find();
      if (application) {
        return application;
      } else {
        throw new BadRequestException('Application doesnt Exists');
      }
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
      const application = await this.applicationRepository.findOne({
        where: {
          id: id,
        },
      });
      if (application) {
        return application;
      } else {
        throw new BadRequestException('Application doesnt Exists');
      }
    } catch (error) {
      throw error;
    }
  }
}
