import http from '../http';

// Get recommend playlist
const getPlaylist = async () => {
  return await http.get('/personalized');
};

// Get recommend singer
const getSinger = async () => {
  return await http.get('/top/artists');
};

export default {
  getPlaylist,
  getSinger,
};
