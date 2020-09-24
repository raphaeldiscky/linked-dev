// check if the token is there it's going to add it to the headers if not it's gonna delete it from the headers
import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// when we have a token which you we're just going to send it with every
// request instead of picking and choosing which request to send it with
export default setAuthToken;
