import axios from 'axios';
import qs from 'qs';
import { API_KEY, BASE_URL } from '../config/ApiConfi';

//Axios configuration for searches
const apiSearch = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});

//Interceptor for requests
apiSearch.interceptors.request.use(request => {
    const queryString = qs.stringify(request.params, { arrayFormat: 'repeat' });
    return request;
});

//Function to fetch multiple data
export const fetchData = async (page, selectedValue) => {
    const fields = ['title', 'popularity', 'release_date', 'poster_path', 'id', 'name'];
    try {
        const response = await axios.get(`${BASE_URL}/${page}/${selectedValue}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page: 1,
            }
        });

        const movies = response.data.results;

        return movies.map(movie => 
            fields.reduce((filtered, field) => {
                if (movie[field]) {
                    filtered[field] = movie[field];
                }
                return filtered;
            }, {})
        );
    } catch (error) {
        handleError(error);
    }
};

// Function to search data
export const fetchSearchData = async (type, title) => {
    try {
        const params = {
            query: title,
            api_key: API_KEY,
            language: "en-US"
        };

        const response = await apiSearch.get(`/search/${type}`, { params });
        return response.data.results;
    } catch (error) {
        handleError(error);
    }
};

//Function to fetch data for a single item
export const fetchSingleData = async (page, id) => {
    const fields = ['title', 'popularity', 'release_date', 'poster_path', 'overview', 'name'];
    try {
        const response = await axios.get(`${BASE_URL}/${page}/${id}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
            }
        });

        const movie = response.data;

        return fields.reduce((filtered, field) => {
            if (movie[field]) {
                filtered[field] = movie[field];
            }
            return filtered;
        }, {});
    } catch (error) {
        handleError(error);
    }
};

//Error handling
const handleError = (error) => {
    if (error.response) {
        console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up the request:', error.message);
    }
    throw error;
};
