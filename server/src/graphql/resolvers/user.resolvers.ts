import knex from '../../database/index.database';
import CustomError from '../../utilities/customError.utils';
import dayjs from 'dayjs';

import { ApolloError } from 'apollo-server-express';
import { ACCESS_TOKEN_SECRET } from '../../utilities/environmentVariables.utils';
import { generateAccessToken, generateShortID } from '../../utilities/stringFunctions.utils';
import { hashPassword, comparePassword } from '../../utilities/passwordHasher.utils';
import { SignOptions } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { validateInput } from './../../utilities/inputValidator.utils';

interface IRegisterArgs {
  registerInput: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

interface ILoginArgs {
  loginInput: {
    username: string;
    password: string;
  };
}

interface IContext {
  req: Request;
  res: Response;
}

//TODO: Maby set up a stronger password policy
const login = async (_: any, { loginInput }: ILoginArgs, { res }: IContext) => {
  try {
    const { isValid, errorMessage } = validateInput(loginInput, { username: 'required', password: 'required|min:6' });
    if (!isValid) throw new CustomError(400, errorMessage!);

    const { username, password } = loginInput;

    const usernameLower = username.toLowerCase();

    const userWithUsername = await knex('users').select().where({ username: usernameLower }).first();
    if (!userWithUsername) throw new CustomError(400, 'invalid credentials');

    const passwordIsValid = await comparePassword(password, userWithUsername.password);
    if (!passwordIsValid) throw new CustomError(400, 'invalid credentials');

    //passed all validation checks
    const payload = {
      short_id: userWithUsername.short_id,
      username: userWithUsername.username,
      email: userWithUsername.email,
    };

    const jwtOptions: SignOptions = {
      expiresIn: '1h',
      issuer: 'Readit.co.za',
    };

    const token = generateAccessToken(payload, ACCESS_TOKEN_SECRET!, jwtOptions);
    const cookieExpiryDate = dayjs(new Date()).add(1, 'hour').toDate();

    res.cookie('access-token', token, {
      httpOnly: true,
      expires: cookieExpiryDate,
      sameSite: 'lax',
    });

    return userWithUsername;
  } catch (err) {
    throw new ApolloError(err.message, err.statusCode || 500);
  }
};

const register = async (_: any, { registerInput }: IRegisterArgs, { res }: IContext) => {
  try {
    const { isValid, errorMessage } = validateInput(registerInput, {
      username: 'required',
      email: 'required|email',
      password: 'required|min:6',
      confirmPassword: 'required|min:6|same:password',
    });
    if (!isValid) throw new CustomError(400, errorMessage!);

    const { username, email, password } = registerInput;
    const usernameLower = username.toLowerCase();
    const emailLower = email.toLowerCase();

    const userWithUsername = await knex('users').select().where({ username: usernameLower }).first();
    if (userWithUsername) throw new CustomError(400, 'username already taken');

    const userWithEmail = await knex('users').select().where({ email: emailLower }).first();
    if (userWithEmail) throw new CustomError(400, 'email already in use');

    //passed all validation checks
    const hashedPassword = await hashPassword(password);
    const shortID = generateShortID();

    const savedUser = await knex('users').insert({ short_id: shortID, username: usernameLower, email: emailLower, password: hashedPassword }, '*');

    const payload = {
      short_id: shortID,
      username,
      email,
    };
    const jwtOptions: SignOptions = {
      expiresIn: '1h',
      issuer: 'Readit.co.za',
    };

    const token = generateAccessToken(payload, ACCESS_TOKEN_SECRET!, jwtOptions);
    const cookieExpiryDate = dayjs(new Date()).add(1, 'hour').toDate();

    res.cookie('access-token', token, {
      httpOnly: true,
      expires: cookieExpiryDate,
      sameSite: 'lax',
    });

    return savedUser[0];
  } catch (err) {
    throw new ApolloError(err.message, err.statusCode || 500);
  }
};

const userResolvers = {
  Mutation: {
    register,
    login,
  },
};

export default userResolvers;
