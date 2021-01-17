import subResolvers from './sub.resolvers';
import userResolvers from './user.resolvers';

const defaultResolver = {
  Query: {
    _empty: () => 'empty',
  },

  Mutation: {
    _empty: () => 'empty',
  },
};

const resolvers = [defaultResolver, userResolvers, subResolvers];

export default resolvers;
