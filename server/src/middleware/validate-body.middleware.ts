import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../utilities/customError.utils';

const validateBody: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const { msg } = errors.array()[0];

    throw new CustomError(400, msg);
  } catch (err) {
    next(err);
  }
};

export default validateBody;
