import http from '../http';
import type ResponseType from '../../types/res';
import playlistApi from './playlistApi';

// Get all favorite songs
const getAllFavor = async (uid: string) => {
  const playlist = (await http.get(`/user/playlist?uid=${uid}`)) as ResponseType;
  const favorInfo = playlist.playlist[0];
  const pid = favorInfo.id;
  const detail = (await playlistApi.getPlaylistDetail(pid)) as ResponseType;
  return detail.playlist;
};

export default {
  getAllFavor,
};
