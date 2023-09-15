import { type AlbumType, type ArtistType } from '../../views/types/playlist';

export interface PlaySongType {
  id: number;
  name: string;
  url: string;
  type: string;
  time: number;
  size: number;
  coverImgUrl: string;
  artists: ArtistType[];
  album: AlbumType;
  lyric?: string;
}
