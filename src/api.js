const api = async() => {
  const key = 'Zl4d7IVkemOTTVg2fUdz';
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/score`;

  const response = await fetch(url, { mode: 'cors' }).then(e => e.json())

  return response
}; 

export default api;