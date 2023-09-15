// Get the song's url
import http from '../http';

const getSongUrl = async (sid: string, level: string) => {
  return await http.get(`/song/url/v1?id=${sid}&level=${level}`);
};

// Get music detail
const getSongDetail = async (sid: string) => {
  return await http.get(`/song/detail?ids=${sid}`);
};

export default {
  getSongUrl,
  getSongDetail,
};
