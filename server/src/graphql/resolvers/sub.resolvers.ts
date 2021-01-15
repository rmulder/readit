import { ApolloError } from 'apollo-server-express';
import knex from '../../database/index.database';

interface ISubArgs {
  name: string;
}

const subs = async () => {
  try {
    const subs = await knex('subs').select();

    return subs;
  } catch (err) {
    throw new ApolloError(err.message, err.statusCode || 500);
  }
};

const sub = async (parent: any, args: ISubArgs, context: any) => {
  try {
    const sub = await knex('subs').where({ name: args.name }).first().select();

    return sub;
  } catch (err) {
    throw new ApolloError(err.message, err.statusCode || 500);
  }
};

const subResolvers = {
  Query: {
    subs,
    sub,
  },
};

export default subResolvers;
