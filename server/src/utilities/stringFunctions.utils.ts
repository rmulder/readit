import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

export const generateShortID = () => {
  return nanoid();
};

export const hashPassword = async (plainPassword: string) => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(plainPassword, salt);
};
