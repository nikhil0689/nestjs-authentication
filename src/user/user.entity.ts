import { Entity, proxyEntity } from '../entity';

export interface UserProps {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface CreateUserProps {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password?: string;
}

export interface ValidateUserProps {
  readonly userId: string;
  readonly refreshToken?: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }
  static create(props: UserProps, id?: string): User {
    return proxyEntity(new User(props, id));
  }
}
