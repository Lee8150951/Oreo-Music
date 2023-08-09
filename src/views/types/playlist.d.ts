export interface SongType {
  id: number;
  name: string;
  al: AlbumType;
  ar: ArtistType[];
  [prop: string]: any;
}

export interface ArtistType {
  id: number;
  name: string;
}

export interface AlbumType {
  id: number;
  name: string;
  picUrl: string;
}
