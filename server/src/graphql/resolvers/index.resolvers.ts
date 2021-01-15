import subResolvers from './sub.resolvers';

const defaultResolver = {
  Query: {
    _empty: () => 'empty',
  },
};

const resolvers = [defaultResolver, subResolvers];

export default resolvers;
