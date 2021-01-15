import { makeExecutableSchema } from 'apollo-server-express';
import typeDefs from './typeDefs/index.typeDefs';
import resolvers from './resolvers/index.resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
