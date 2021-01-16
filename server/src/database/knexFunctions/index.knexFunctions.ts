import Knex, { CreateTableBuilder } from 'knex';

export const UuidPrimaryKey = (table: CreateTableBuilder, knex: Knex) => {
  table.uuid('id').primary().index().defaultTo(knex.raw('uuid_generate_v4()'));
};

export const shortID = (table: CreateTableBuilder) => {
  table.string('short_id').unique().index().notNullable();
};

export const timestamps = (table: CreateTableBuilder) => {
  table.timestamps(true, true);
};
