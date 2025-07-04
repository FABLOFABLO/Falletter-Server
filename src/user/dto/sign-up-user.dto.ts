import { IsEmail, IsEnum } from 'class-validator';
import { GenderEnum } from './gender.enum';

export class SignUpUserDTO {
  name: string;

  student_num: number;

  @IsEmail({}, {message: "유효한 이메일 주소를 입력하여 주십시오"})
  email: string;

  // @MinLength(4, {message: "비밀번호는 최소 4자 이상입니다"})
  pw: string;

  @IsEnum(GenderEnum)
  gender: GenderEnum;
}
