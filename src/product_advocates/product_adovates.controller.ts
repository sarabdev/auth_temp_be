import {
    Controller,
    Delete,
    Get,
    Req,
    Param,
    Patch,
    Post,
    Put,
    Body
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/auth/constants';
import { ProductAdvocatesService } from './product_advocates.service';
import { error } from 'console';

@ApiTags('ProdcutAdovate')
@ApiBearerAuth()
@Controller('product_advocate')
export class ProductAdvocateController {
    constructor(private readonly productAdvocateService: ProductAdvocatesService) { }




    @Get('find_all')
    async findAll() {
        try {
            return await this.productAdvocateService.findAllUnassigned();
        } catch (error) {
            throw error;
        }
    }

    @Post('update_company')
    async updateCompany(@Body() body: any) {
        try {
            const { recordId, newCompanyId } = body;

            return await this.productAdvocateService.updateCompany(recordId, newCompanyId)
        }
        catch (e) {
            throw error;
        }
    }


}
