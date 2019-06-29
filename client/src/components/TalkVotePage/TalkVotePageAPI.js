const SERVER_URL = 'http://138.68.110.104:8000/api/v1';

export const getQuestions = (talkID) => {
  return fetch(`${SERVER_URL}/questions/?talk=${talkID}`, { method: 'GET' });
};

export const createTalkVote = (talk, positive, description, userId) => {
  let objData = Object.assign({talk: talk, positive: positive, description: description, user: userId});

  return fetch(`${SERVER_URL}/talk_votes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(objData)
  })
    .then((result) => result.json())
    .then((data) => {
      console.log('voted', data)
    })
    .catch((error) => console.log(error));
};

export const createQuestionVote = (question, user) => {
  let objData = Object.assign({question: question, user: user});

  fetch(`${SERVER_URL}/question_votes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(objData)
  })
    .then((result) => result.json())
    .then((data) => {
      console.log('voted', data)
    })
    .catch((error) => console.log(error));
};

export const createQuestion = (data) => {
  return fetch(`${SERVER_URL}/questions/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
};

export const createCommentVote = (data) => {
  return fetch(`${SERVER_URL}/questions/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
};

export const getTalksVotes = (userId, talkId) => {
  return fetch(`${SERVER_URL}/talk_votes/?user=${userId}&talkId=${talkId}`);
}