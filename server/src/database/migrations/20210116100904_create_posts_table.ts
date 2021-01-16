import * as Knex from 'knex';
import { shortID, timestamps, UuidPrimaryKey } from '../knexFunctions/index.knexFunctions';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('posts', (t) => {
    UuidPrimaryKey(t, knex);
    shortID(t);
    t.string('title').notNullable();
    t.string('slug').notNullable();
    t.text('body').nullable();
    t.integer('vote_count').notNullable().defaultTo(0);
    timestamps(t);

    t.string('username').references('username').inTable('users').notNullable().onDelete('CASCADE');
    t.string('sub_name').references('name').inTable('subs').notNullable().onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('posts');
}
