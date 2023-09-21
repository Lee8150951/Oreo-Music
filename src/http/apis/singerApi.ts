import http from '../http';

// Get singer detail
const getSingerDetail = async (sid: string) => {
  return await http.get(`/artist/detail?${sid}`);
};

export default {
  getSingerDetail,
};
