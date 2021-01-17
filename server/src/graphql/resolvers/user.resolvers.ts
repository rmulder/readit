import knex from '../../database/index.database';
import CustomError from '../../utilities/customError.utils';
import dayjs from 'dayjs';

import { ApolloError } from 'apollo-server-express';
import { ACCESS_TOKEN_SECRET } from '../../utilities/environmentVariables.utils';
import { generateAccessToken, generateShortID } from '../../utilities/stringFunctions.utils';
import { hashPassword, comparePassword } from '../../utilities/passwordHasher.utils';
import { SignOptions } from 'jsonwebtoken';
import { Request, Response } from 'express';

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

//TODO: Validate input like is password more than 6 chars
//TODO: Make sure the username is lowercase when searching the database
const login = async (_: any, args: ILoginArgs, context: IContext) => {
  try {
    const { res } = context;
    const { username, password } = args.loginInput;

    const userWithUsername = await knex('users').select().where({ username }).first();
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

//TODO: Validate input like is password more than 6 chars, is email a valid email etc
//TODO: make sure username and email is stored in database as lowercase. Also make sure the inputs are lowercase when searching the database
const register = async (_: any, args: IRegisterArgs, context: IContext) => {
  try {
    const { res } = context;
    const { username, email, password, confirmPassword } = args.registerInput;

    const userWithUsername = await knex('users').select().where({ username }).first();
    if (userWithUsername) throw new CustomError(400, 'username already taken');

    const userWithEmail = await knex('users').select().where({ email }).first();
    if (userWithEmail) throw new CustomError(400, 'email already in use');

    //passed all validation checks
    const hashedPassword = await hashPassword(password);
    const shortID = generateShortID();

    const savedUser = await knex('users').insert({ short_id: shortID, username, email, password: hashedPassword }, '*');

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
  Query: {
    login,
  },
  Mutation: {
    register,
  },
};

export default userResolvers;
