import axios from 'axios';

// Define your base URL
const baseURL = 'http://localhost:3001/api/v1'; // Replace with your API base URL

export async function genericCall(endpoint, method, data = null) {

  try {
    const url = `${baseURL}/${endpoint}`; // Construct the full URL

    let response;
    if (method === 'GET') {
      response = await axios.get(url);
    } else if (method === 'POST') {
      response = await axios.post(url, data);
    } else {
      throw new Error('Unsupported HTTP method');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}
