// application.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationSeeder {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async seed() {
    const applications = [
      { name: 'EMS', url: 'http://EMS.com/', logoUrl: 'http://example.com/app1_logo.png' },
      { name: 'Samodrie', url: 'http://Samodrie.com/', logoUrl: 'http://example.com/app2_logo.png' },
      { name: 'ASCTHEM', url: 'http://ASCTHEM.com/', logoUrl: 'http://example.com/app3_logo.png' },
      { name: 'PHARMACY_PORTAL', url: 'http://PHARMACY_PORTAL.com/', logoUrl: 'http://example.com/app4_logo.png' },
    ];

    await Promise.all(applications.map(async appData => {
      const application = this.applicationRepository.create(appData);
      return this.applicationRepository.save(application);
    }));
  }
}
