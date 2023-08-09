import http from '../http';

// Get all the playlists of current user
const getUserPlaylist = async (uid: number) => {
  return await http.get(`/user/playlist?uid=${uid}`);
};

// Get all songs in the playlist
const getSongFromPlaylist = async (sid: string) => {
  return await http.get(`/playlist/track/all?id=${sid}`);
};

export default {
  getUserPlaylist,
  getSongFromPlaylist,
};
