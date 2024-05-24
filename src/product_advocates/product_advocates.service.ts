import { BadRequestException, Injectable } from '@nestjs/common';

import { Company } from '../Public/Entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationsService } from '../applications/applications.service';
import { Public } from 'src/auth/constants';
import { ProductAdvocate } from 'src/Public/Entities/product_advocate.entity';

@Injectable()
export class ProductAdvocatesService {
    constructor(
        @InjectRepository(ProductAdvocate)
        private productAdvocateRepository: Repository<ProductAdvocate>,
        private applicationsService: ApplicationsService,
    ) { }

    async findAllUnassigned() {
        try {
            const advocates = await this.productAdvocateRepository
                .createQueryBuilder("productAdvocate")
                .leftJoinAndSelect("productAdvocate.company", "company")
                // .where("productAdvocate.companyId IS NULL")
                .getMany();

            return advocates;
        } catch (error) {
            throw error;
        }
    }

    async updateCompany(productAdvocateId, newCompanyId) {
        try {
            // Find the record by its ID
            const record = await this.productAdvocateRepository.findOne({
                where: { Id: productAdvocateId },
                relations: ["company"]
            });

            if (!record) {
                throw new Error(`Record with ID ${productAdvocateId} not found`);
            }



            // Update the company field
            record.company = newCompanyId

            // Save the updated record
            await this.productAdvocateRepository.save(record);

            return record;
        } catch (error) {
            throw error;
        }
    }




}
