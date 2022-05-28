import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from './entities/user.entity';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/showCurrentUser')
  @UseGuards(AuthGuard)
  async showCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // CreateUserDto also works for signin route
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post()
  findAllUsers(@Body() body: any) {
    return this.usersService.find(body.email);
  }

  @Get('/:id')
  findUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(Number(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
