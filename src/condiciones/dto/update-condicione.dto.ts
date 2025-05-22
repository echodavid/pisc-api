import { PartialType } from '@nestjs/mapped-types';
import { CreateCondicionDto } from './create-condicione.dto';

export class UpdateCondicioneDto extends PartialType(CreateCondicionDto) {}
