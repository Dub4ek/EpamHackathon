const SERVER_URL = 'http://138.68.110.104:8000/api/v1';

export const getQuestions = () => {
  return fetch(`${SERVER_URL}/questions/`, { method: 'GET' });
};

export const createQuestionVote = (question, user) => {
  let objData = Object.assign({question: question, user: user});
  console.log(objData);
  let jsonData = JSON.stringify(objData);

  fetch(`${SERVER_URL}/question_votes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
    .then((result) => result.json())
    .then((data) => {
      console.log('voted', data)})
    .catch((error) => console.log(error));
} ;
