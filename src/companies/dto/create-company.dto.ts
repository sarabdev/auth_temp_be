import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsOptional()
  @ApiProperty()
  url: string;

  @IsOptional()
  @ApiProperty()
  logoUrl: string;

  @ApiProperty()
  applicationIds: number[];
}
