import http from '../http';

// Get album detail
const getAlbumDetail = async (aid: string) => {
  return await http.get(`/album?${aid}`);
};

export default {
  getAlbumDetail,
};
