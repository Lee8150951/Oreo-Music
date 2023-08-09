import http from '../http';

// Get all the playlists of current user
const getUserPlaylist = async (uid: string) => {
  return await http.get(`/user/playlist?uid=${uid}`);
};

export default {
  getUserPlaylist,
};
