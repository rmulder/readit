import { nanoid } from 'nanoid';
import jwt, { SignOptions } from 'jsonwebtoken';

export const generateShortID = () => {
  return nanoid();
};

export const generateAccessToken = (payload: {}, secret: string, options: SignOptions) => {
  const token = jwt.sign(payload, secret, options);

  return token;
};
