export interface SongType {
  id: number;
  name: string;
  al: AlbumType;
  ar: ArtistType[];
  dt: number;
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

export interface PlaylistDetailType {
  id: number;
  name: string;
  coverImgUrl: string;
  creator: CreatorType;
  createTime: number;
  trackCount: number;
  description: string;
  tags: string[];
}

export interface CreatorType {
  userId: number;
  nickname: string;
  avatarUrl: string;
  city: number;
}
