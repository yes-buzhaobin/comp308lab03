// First we need to import axios.js
import axios from 'axios';

// Next we make an 'instance' of it
const instance = axios.create({
    withCredentials: true
});

export default instance;
