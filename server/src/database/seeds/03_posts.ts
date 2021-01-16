import * as Knex from 'knex';
import { generateShortID } from '../../utilities/stringFunctions.utils';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('posts').del();

  // Inserts seed entries
  await knex('posts').insert([
    {
      short_id: generateShortID(),
      title: 'Burnout Syndromes Releases A New Album',
      slug: 'burnout-syndromes-releases-a-new-album',
      body: 'The japanese band Burnout Syndromes has just released a new studio album. Click link below to view',
      username: 'willem',
      sub_name: 'music',
    },
  ]);
}
