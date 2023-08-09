export type UserType = Record<string, any>;

export interface PlaylistType {
  id: number;
  userId: number;
  name: string;
  backgroundCoverUrl: string;
  coverImgUrl: string;
  description: string;
  creator: any;
  playCount: number;
  [prop: string]: any;
}
