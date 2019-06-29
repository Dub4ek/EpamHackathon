const SERVER_URL = 'http://138.68.110.104:8000/api/v1'

export const getTalksList = () => {
   return fetch(`${SERVER_URL}/talks/`, { mode: 'no-cors', method: 'GET' });
} ;