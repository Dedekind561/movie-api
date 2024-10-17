import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "3cce9517ed75ca9d0399522dd5f7c4f3";

//filteirng genre
// const genre = {
//     "genres": [
//       {
//         "id": 28,
//         "name": "Action"
//       },
//       {
//         "id": 12,
//         "name": "Adventure"
//       },
//       {
//         "id": 16,
//         "name": "Animation"
//       },
//       {
//         "id": 35,
//         "name": "Comedy"
//       },
//       {
//         "id": 80,
//         "name": "Crime"
//       },
//       {
//         "id": 99,
//         "name": "Documentary"
//       },
//       {
//         "id": 18,
//         "name": "Drama"
//       },
//       {
//         "id": 10751,
//         "name": "Family"
//       },
//       {
//         "id": 14,
//         "name": "Fantasy"
//       },
//       {
//         "id": 36,
//         "name": "History"
//       },
//       {
//         "id": 27,
//         "name": "Horror"
//       },
//       {
//         "id": 10402,
//         "name": "Music"
//       },
//       {
//         "id": 9648,
//         "name": "Mystery"
//       },
//       {
//         "id": 10749,
//         "name": "Romance"
//       },
//       {
//         "id": 878,
//         "name": "Science Fiction"
//       },
//       {
//         "id": 10770,
//         "name": "TV Movie"
//       },
//       {
//         "id": 53,
//         "name": "Thriller"
//       },
//       {
//         "id": 10752,
//         "name": "War"
//       },
//       {
//         "id": 37,
//         "name": "Western"
//       }
//     ]
//   }

//TRENDING 
export const fetchTrending = async (timeWindow = "day") => {
    const { data} = await axios.get(
        `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`);
    return data?.results;
};

//Movies + TV Series 

export const fetchDetails = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
    return res?.data;
};

// MOVIES + SERIES - Credits 

export const fetchCredits = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`);
    return res?.data;
};


// MOVIES + SERIES - Vidoes

export const fetchVideos = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`);
    return res?.data;
};


// Discover 

export const fetchMovies = async (page, sortBy) => {
    const res = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
    return res?.data;
};
export const fetchTvSeries = async (page, sortBy) => {
    const res = await axios.get(`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
    return res?.data;
};

//Search 

export const searchData = async (query, page) => {
    const res =await axios.get(`${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`)
    return res?.data;

};