import knex from 'knex';
import { NODE_ENV } from '../utilities/environmentVariables.utils';

const config = require('../../knexfile')[NODE_ENV || 'development'];

export default knex(config);
