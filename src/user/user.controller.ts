import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDTO } from './dto/sign-up-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  signin(@Body() signinUserDto: SignInUserDto) {
    return this.userService.signin(signinUserDto);
  }

  @Post('/signup')
  signup(@Body() signUpuserDto: SignUpUserDTO){
    return this.userService.signup(signUpuserDto);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.sub;
    return this.userService.update(+userId, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}