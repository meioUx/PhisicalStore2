import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePhysicalStoreDto {
    @ApiProperty()
    @IsString()
    storeName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    takeOutInStore?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    shippingTimeInDays?: number;

    @ApiProperty()
    @IsString()
    latitude: string;

    @ApiProperty()
    @IsString()
    longitude: string;

    @ApiProperty()
    @IsString()
    address1: string;

    @ApiProperty()
    @IsString()
    address2: string;

    @ApiProperty()
    @IsString()
    address3: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    district: string;

    @ApiProperty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsString()
    type: string;
    
    @ApiProperty()
    @IsString()
    postalCode: string;

    @ApiProperty()
    @IsString()
    telephoneNumber: string;

    @ApiProperty()
    @IsString()
    emailAddress: string;

    @ApiProperty()
    @IsString()
    typeId: string;
}
