import * as Knex from 'knex';
import { generateShortID, hashPassword } from '../../utilities/stringFunctions.utils';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  return await knex('users').insert([
    { short_id: generateShortID(), username: 'willem', email: 'willem@gmail.com', password: await hashPassword('willemPassword') },
    { short_id: generateShortID(), username: 'charl', email: 'charl@gmail.com', password: await hashPassword('charlPassword') },
    { short_id: generateShortID(), username: 'john', email: 'john@gmail.com', password: await hashPassword('johnPassword') },
  ]);
}
