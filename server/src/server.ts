import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import schema from './graphql/index.graphql';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { PORT, CLIENT_URL } from './utilities/environmentVariables.utils';
import { ApolloServer } from 'apollo-server-express';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const apolloServer = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });
apolloServer.applyMiddleware({ app, cors: { origin: CLIENT_URL, credentials: true } });

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
