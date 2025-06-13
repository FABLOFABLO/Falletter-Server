import { PartialType } from '@nestjs/mapped-types';
import { SignUpUserDTO } from './sign-up-user.dto';

export class UpdateUserDto extends PartialType(SignUpUserDTO) {}
