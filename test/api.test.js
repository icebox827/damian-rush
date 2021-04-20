import '@babel/polyfill';
import 'regenerator-runtime/runtime';
import fetch from 'node-fetch';

it('Should return some data', async () => {
  const data = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Fw4h5zsu1gzlNsfCifNc/scores/',
  );
  const response = await data.json();
  expect(response.result[0].user).toEqual('1');
});

it('Leaderboard score created correctly.', async () => {
  const responsr = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Fw4h5zsu1gzlNsfCifNc/scores/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: 'sam', score: '10' }),
    },
  );
  const res = await responsr.json();

  expect(res.result).toEqual('Leaderboard score created correctly.');
});
