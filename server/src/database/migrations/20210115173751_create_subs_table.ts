import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subs', (t) => {
    t.uuid('id').primary().index().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('name').unique().index().notNullable();
    t.string('title').notNullable();
    t.string('description').notNullable();
    t.string('image_urn').notNullable().defaultTo('defaultSubImage.png');
    t.string('banner_urn').nullable();
    t.timestamps(true, true);

    //foreign keys
    t.string('username').references('username').inTable('users').notNullable().onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('subs');
}
