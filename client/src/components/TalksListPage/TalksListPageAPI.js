const SERVER_URL = 'http://138.68.110.104:8000/api/v1'

export const getTalksList = () => {
   return fetch(`${SERVER_URL}/talks/`);
};

export const createTalk = (data) => {
   return fetch(`${SERVER_URL}/talks/`,
     {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
           'Content-Type': 'application/json'
        }
     });
}