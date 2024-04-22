import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCompanyDto {
    
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  
    @IsNotEmpty()
    @ApiProperty()
    address: string;    
    
    @IsNotEmpty()
    @ApiProperty()
    url:string;
    
    @IsNotEmpty()
    @ApiProperty()
    logoUrl:string;

    @ApiProperty()
    applicationIds: number[];
}
