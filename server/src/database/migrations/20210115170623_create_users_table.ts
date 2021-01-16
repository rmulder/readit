import * as Knex from 'knex';
import { shortID, timestamps, UuidPrimaryKey } from '../knexFunctions/index.knexFunctions';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (t) => {
    UuidPrimaryKey(t, knex);
    shortID(t);
    t.string('username').unique().index().notNullable();
    t.string('email').unique().index().notNullable();
    t.string('password').notNullable();
    timestamps(t);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
