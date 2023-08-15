import { type AlbumType, type ArtistType } from '../../views/types/playlist';

export interface PlaySongType {
  id: number;
  name: string;
  coverImgUrl: string;
  artists: ArtistType[] | string;
  album: AlbumType | string;
}
