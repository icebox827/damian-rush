const key = 'Zl4d7IVkemOTTVg2fUdz';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/score`;

const getScore = async () => {
  const data = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/');
  const response = await data.json();
  return response.result;
};

const setScore = async (name, score) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: name, score }),
  });

  return response;
};

export { getScore, setScore };