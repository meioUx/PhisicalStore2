import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalStoreDto } from './create-physical-store.dto';

export class UpdatePhysicalStoreDto extends PartialType(CreatePhysicalStoreDto) {}
