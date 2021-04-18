const key = 'Zl4d7IVkemOTTVg2fUdz';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/score`;

const getScore = async() => {
  const response = await fetch(url, { mode: 'cors' }).then(e => e.json());

  return response;
}; 

const setScore = async(name, score) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: name, score }),
  });

  return response;
};

export default {getScore, setScore};