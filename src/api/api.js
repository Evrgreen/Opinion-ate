import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.outsidein.dev/A3tnhnEhYuBIX4XVhHYvnWUx2WzcI9s5',
});

const api = {
    async loadRestaurants() {
        console.log('in load restaurants');
        const response = await client.get('/restaurants');
        console.log(response);
        return response.data;
    },
};

export default api;
