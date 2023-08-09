import http from '../http';

// Get user info
const getUserInfo = async (uid: string) => {
  return await http.get(`/user/detail?uid=${uid}`);
};

// Get user status
const getUserStatus = async (cookie: string) => {
  const timestamp = Date.now();
  return await http.post(`/login/status?timestamp=${timestamp}`, {
    cookie,
  });
};

const getUserPlaylist = async (uid: string) => {
  return await http.get(`/user/playlist?uid=${uid}`);
};

export default {
  getUserInfo,
  getUserStatus,
  getUserPlaylist,
};
