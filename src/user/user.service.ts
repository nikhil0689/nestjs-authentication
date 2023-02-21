import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from '../utils';
import { CreateUserProps, User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async createUser(createUserProps: CreateUserProps): Promise<User> {
    const user = this.userRepo.getUserByEmail(createUserProps.email);
    if (!user) {
      throw new HttpException(
        'User with email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { email, firstName, lastName, password } = createUserProps;
    const hashedPassword = await hash(password);
    const newUser = User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    return this.userRepo.createUser(newUser);
  }
}
