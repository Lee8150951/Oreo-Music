import http from '../http';

// Get recommend playlist
const getPlaylist = async () => {
  return await http.get('/personalized');
};

export default {
  getPlaylist,
};
