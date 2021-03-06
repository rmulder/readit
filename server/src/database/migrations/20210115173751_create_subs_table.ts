import * as Knex from 'knex';
import { shortID, timestamps, UuidPrimaryKey } from '../knexFunctions/index.knexFunctions';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subs', (t) => {
    UuidPrimaryKey(t, knex);
    shortID(t);
    t.string('name').unique().index().notNullable();
    t.string('title').notNullable();
    t.string('description').notNullable();
    t.string('image_urn').notNullable().defaultTo('defaultSubImage.png');
    t.string('banner_urn').nullable();
    timestamps(t);

    //foreign keys
    t.string('username').references('username').inTable('users').notNullable().onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('subs');
}
