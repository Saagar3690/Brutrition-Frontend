import Axios from 'axios';

import BASE_URL from '../constants/Requests';

const axios = Axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

async function getMenu(date) {
  try {
    const data = (await axios.get('/menus/date', {
      params: {
        date: date,
      }
    })).data

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default { getMenu };
