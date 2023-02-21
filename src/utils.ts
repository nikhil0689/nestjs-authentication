import * as secureRandomString from 'secure-random-string';
import * as bcrypt from 'bcrypt';

const ID_LENGTH = 20;
const genUidOptions = { length: ID_LENGTH };

export const genId = async (): Promise<string> => {
  return secureRandomString(genUidOptions);
};

export const genToken = async (): Promise<string> => {
  return secureRandomString({ length: 48 });
};

export const hash = async (password: string): Promise<string> => {
  return bcrypt.hash(password, bcrypt.genSaltSync());
};
