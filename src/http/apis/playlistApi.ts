import http from '../http';

// Get all the playlists of current user
const getUserPlaylist = async (uid: number) => {
  return await http.get(`/user/playlist?uid=${uid}`);
};

// Get all songs in the playlist
const getSongFromPlaylist = async (sid: string) => {
  return await http.get(`/playlist/track/all?id=${sid}`);
};

// Get playlist detail
const getPlaylistDetail = async (sid: string) => {
  return await http.get(`/playlist/detail?id=${sid}`);
};

// Get user's favorite playlist
const getFavorPlaylist = async (uid: string) => {
  return await http.get(`/likelist?uid=${uid}`);
};

// Like music
const addFavorMusic = async (sid: number, favor: boolean) => {
  return await http.get(`/like?id=${sid}&like=${String(favor)}`);
};

export default {
  getUserPlaylist,
  getSongFromPlaylist,
  getPlaylistDetail,
  getFavorPlaylist,
  addFavorMusic,
};
