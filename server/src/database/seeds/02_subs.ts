import * as Knex from 'knex';
import { generateShortID } from '../../utilities/stringFunctions.utils';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('subs').del();

  // Inserts seed entries
  return await knex('subs').insert([
    { short_id: generateShortID(), name: 'music', title: 'Everything music related', description: 'A subreddit dedicated to music lovers', username: 'willem' },
    { short_id: generateShortID(), name: 'programmingjokes', title: 'Programming Jokes', description: 'A subreddit where you can post programming jokes', username: 'charl' },
  ]);
}
