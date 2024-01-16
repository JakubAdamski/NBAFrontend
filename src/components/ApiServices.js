import axios from 'axios';

const API_URL = 'http://your-api-url.com';

class ApiServices {
  login(email, password) {
    return axios
      .post(API_URL + '/login', {
        email,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password) {
    return axios.post(API_URL + '/register', {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  } 
}

export default new ApiServices();
