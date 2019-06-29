const SERVER_URL = 'http://138.68.110.104:8000/api/v1';

export const createUser = (data) => {
  let jsonData = JSON.stringify(data);

  fetch(`${SERVER_URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
    .then((result) => result.json())
    .then((data) => {
      localStorage.setItem('id', data.id);
      console.log('registered', data)})
    .catch((error) => console.log(error));
} ;
