import axios from 'axios';
import Video from "@/../models/Video"
// Define your base URL

// Utility function for generic API calls
export async function genericCall(endpoint, method, data = null, params = {}, baseURL) {
  if (baseURL === undefined || baseURL === null || baseURL === '') {
    baseURL = 'http://localhost:3002/api/v1'; // Replace with your API base URL
  } 
  try {
    const url = `${baseURL}/${endpoint}`;
    console.log(url);
    let response;

    if (method === 'GET') {
      response = await axios.get(url, { params });
    } else if (method === 'POST') {
      response = await axios.post(url, data, { params });
    } else {
      throw new Error('Unsupported HTTP method');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to fetch video data
export async function fetchVideoData(slug) {
  const endpoint = `videos/${slug}`;
  const baseUrl = 'https://you-b.herokuapp.com/api/v1';
  const sortParams = { slug: slug };

  try {
    const response = await genericCall(endpoint, 'GET', null, sortParams, baseUrl);
    const video = new Video(response, 'sv');
    return (Object.assign({}, video));
  } catch (error) {
    console.error('Error fetching video data:', error);
    return null;
  }
}

