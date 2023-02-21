import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserCreateDTO } from './dtos/user.create.dto';
import { UserResponseDTO } from './dtos/user.response.dto';
import { UserMap } from './user.datamapper';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@RequestUser() user: User): Promise<UserResponseDTO> {
    return UserMap.toUserDTO(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDTO> {
    const user = await this.userService.getUserById(id);
    return UserMap.toUserDTO(user);
  }

  @Post()
  async createUser(
    @Body() userCreateDTO: UserCreateDTO,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.createUser(userCreateDTO);
    return UserMap.toUserDTO(user);
  }
}
