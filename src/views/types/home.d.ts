export interface PlaylistType {
  id: number;
  alg: string;
  canDislike: boolean;
  copywriter: string;
  highQuality: boolean;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  type: number;
}

export interface SingerType {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: string[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  picId_str: string;
  img1v1Id_str: string;
  followed: boolean;
  fansCount: number;
}

export interface AlbumType {
  name: string;
  id: number;
  type: string;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company: string;
  briefDesc: string;
  artist: SingerType;
  alias: any;
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: SingerType[];
  paid: boolean;
  onSale: boolean;
  picId_str: string;
}

export interface ToplistType {
  subscribers: string[];
  updateFrequency: string;
  backgroundCoverId: number;
  titleImage: number;
  opRecommend: boolean;
  subscribedCount: number;
  cloudTrackCount: number;
  userId: number;
  trackNumberUpdateTime: number;
  adType: number;
  createTime: number;
  highQuality: boolean;
  specialType: number;
  updateTime: number;
  coverImgId: number;
  anonimous: boolean;
  newImported: boolean;
  coverImgUrl: string;
  trackUpdateTime: number;
  trackCount: number;
  totalDuration: number;
  commentThreadId: string;
  privacy: number;
  playCount: number;
  ordered: boolean;
  tags: string[];
  description: string;
  status: number;
  name: string;
  id: number;
  coverImgId_str: string;
  ToplistType: string;
}
