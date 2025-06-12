import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninUserDto } from './dto/singin-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  signin(@Body() signinUserDto: SigninUserDto) {
    return this.userService.signin(signinUserDto);
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto){
    return this.userService.signup(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.sub;
    return this.userService.update(+userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}