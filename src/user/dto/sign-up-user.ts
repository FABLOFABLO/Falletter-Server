import { IsString, IsEmail, MinLength } from 'class-validator';

export class SignUpUserDTO {
  name: string;

  @IsEmail({}, {message: "유효한 이메일 주소를 입력하여 주십시오"})
  email: string;

  // @MinLength(4, {message: "비밀번호는 최소 4자 이상입니다"})
  pw: string;
}
