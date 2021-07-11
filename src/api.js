const getScore = async () => {
  const data = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1Tl7nDg1f9trhfiL2FpE/scores/');
  const response = await data.json();
  return response.result;
};

const setScore = async (name, score) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1Tl7nDg1f9trhfiL2FpE/scores/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: name, score }),
  });

  return response;
};

export { getScore, setScore };