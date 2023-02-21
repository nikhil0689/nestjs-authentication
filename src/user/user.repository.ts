import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { genId } from '../utils';
import { UserMap } from './user.datamapper';
import { User } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async getUserById(id: string): Promise<User> {
    const modelInstance = await this.userModel.findOne({
      where: {
        id,
      },
    });
    return UserMap.toDomain(modelInstance);
  }

  async getUserByEmail(email: string): Promise<User> {
    const modelInstance = await this.userModel.findOne({
      where: {
        email,
      },
    });
    return UserMap.toDomain(modelInstance);
  }

  async createUser(user: User): Promise<User> {
    const raw = UserMap.toPersistence(user);
    const id = await genId();
    raw.id = id;
    const val = await this.userModel.create(raw);
    return UserMap.toDomain(val);
  }
}
