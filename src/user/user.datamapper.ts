import { UserResponseDTO } from './dtos/user.response.dto';
import { User } from './user.entity';
import { UserModel } from './user.model';

export class UserMap {
  static toDomain(model: UserModel): User {
    if (!model) {
      return null;
    }
    const { id, firstName, lastName, email, password, createdAt, updatedAt } =
      model;
    const projectedProps = {
      id,
      firstName,
      lastName,
      email,
      password,
      createdAt,
      updatedAt,
    };
    return User.create(projectedProps);
  }

  static toPersistence(entity: User): UserModel {
    const { firstName, lastName, email, password } = entity.props;
    const { id, primaryKey } = entity;
    const raw = {
      ...(entity.isPersisted && { primaryKey }),
      id,
      firstName,
      lastName,
      email,
      password,
    };
    return raw as UserModel;
  }

  static toUserDTO(entity: User): UserResponseDTO {
    if (entity === null) {
      return null;
    }
    const { id, firstName, lastName, email, createdAt, updatedAt } = entity;
    return {
      id,
      firstName,
      lastName,
      email,
      createdAt,
      updatedAt,
    };
  }
}
