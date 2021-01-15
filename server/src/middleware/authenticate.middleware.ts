import CustomError from '../utilities/customError.utils';
import { RequestHandler } from 'express';
import User from '../database/entities/user.entity';

const authenticate: RequestHandler = async (_, res, next) => {
  try {
    const user: User | undefined = res.locals.user;

    if (!user) throw new CustomError(401, 'unauthenticated');
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
