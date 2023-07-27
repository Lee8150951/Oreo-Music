import http from '../http';

// Get recommend playlist
const getPlaylist = async () => {
  return await http.get('/personalized');
};

// Get recommend singer
const getSinger = async () => {
  return await http.get('/top/artists');
};

// Get new album list
const getAlbum = async () => {
  return await http.get('/album/newest');
};

// Get all toplist
const getToplist = async () => {
  return await http.get('/toplist');
};

export default {
  getPlaylist,
  getSinger,
  getAlbum,
  getToplist,
};
