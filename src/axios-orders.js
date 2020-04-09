import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-321ee.firebaseio.com/',
});

export default instance;
