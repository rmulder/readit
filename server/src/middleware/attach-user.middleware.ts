import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import User from '../database/entities/user.entity';

import { ACCESS_TOKEN_SECRET } from '../utilities/environmentVariables.utils';
import { RequestHandler } from 'express';

type jwtError = JsonWebTokenError | NotBeforeError | TokenExpiredError | null;

const attachUserIfFound: RequestHandler = (req, res, next) => {
  try {
    const accessToken = req.cookies['access-token'];

    if (!accessToken) return next();

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET!, async (err: jwtError, decodedObj: object | undefined) => {
      try {
        if (err) return next();

        const { username }: any = decodedObj;

        const user = await User.findOne({ where: { username } });

        res.locals.user = user;

        next();
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};

export default attachUserIfFound;
