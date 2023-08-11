import { type SongType } from './playlist';

export interface FavorType {
  name: string;
  coverImgUrl: string;
  tracks: SongType[];
  [prop: string]: any;
}
