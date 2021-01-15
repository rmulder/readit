import { RequestHandler } from 'express';
import Sub from '../database/entities/sub.entity';
import User from '../database/entities/user.entity';
import CustomError from '../utilities/customError.utils';

const ownsSubAndAttach: RequestHandler = async (req, res, next) => {
  const { subName } = req.params;

  const user: User = res.locals.user;
  try {
    const sub = await Sub.findOne({ where: { name: subName } });

    if (sub?.username !== user.username) {
      throw new CustomError(403, 'You do not own this sub');
    }

    res.locals.sub = sub;
    return next();
  } catch (err) {
    next(err);
  }
};

export default ownsSubAndAttach;
