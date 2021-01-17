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

const sub = async (_: any, args: ISubArgs) => {
  try {
    const sub = await knex('subs').where({ name: args.name }).first();

    return sub;
  } catch (err) {
    throw new ApolloError(err.message, err.statusCode || 500);
  }
};

const subWithPosts = async (_: any, args: ISubArgs) => {
  try {
    const sub = await knex('subs').where({ name: args.name }).first();
    const posts = await knex('posts').where({ sub_name: args.name });

    let subWithPosts = null;
    if (sub) {
      subWithPosts = {
        ...sub,
        posts,
      };
    }
    return subWithPosts;
  } catch (err) {
    throw new ApolloError(err.message, err.statusCode || 500);
  }
};

const subResolvers = {
  Query: {
    subs,
    sub,
    subWithPosts,
  },
};

export default subResolvers;
