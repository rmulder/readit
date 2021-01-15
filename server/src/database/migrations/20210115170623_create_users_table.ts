import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (t) => {
    t.uuid('id').primary().index().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('username').unique().index().notNullable();
    t.string('email').unique().index().notNullable();
    t.string('password').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
