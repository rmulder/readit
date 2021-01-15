import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('subs').del();

  // Inserts seed entries
  return await knex('subs').insert([
    { name: 'music', title: 'Everything music related', description: 'A subreddit dedicated to music lovers', username: 'willem' },
    { name: 'programmingjokes', title: 'Programming Jokes', description: 'A subreddit where you can post programming jokes', username: 'charl' },
  ]);
}
