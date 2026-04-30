// src/services/api.js
import axios from "axios";

const BASE_URL = "https://qtify-backend.labs.crio.do";

export async function getTopAlbums() {
  const response = await axios.get(`${BASE_URL}/albums/top`);
  return response.data; // array of 13 albums
}