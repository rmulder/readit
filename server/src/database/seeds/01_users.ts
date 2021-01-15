import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  return await knex('users').insert([
    { username: 'willem', email: 'willem@gmail.com', password: 'willemPassword' },
    { username: 'charl', email: 'charl@gmail.com', password: 'charlPassword' },
    { username: 'john', email: 'john@gmail.com', password: 'johnPassword' },
  ]);
}
