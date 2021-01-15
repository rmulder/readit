import knex from 'knex';
import { NODE_ENV } from '../utilities/environmentVariables.utils';
import knexConfig from '../../knexfile';

const config = NODE_ENV === 'development' ? knexConfig.development : knexConfig.production;

export default knex(config);
