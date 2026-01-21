export type arType = {
  id: number;
  name: string;
  artist: { id: number; name: string };
  // artist: any;
};
export type alType = {
  id: number;
  name: string;
  picUrl: string;
};
export type songType = {
  id: number;
  name: string;
  ar: arType[];
  al: alType;
  dt: number;
  picUrl: string;
  // duration: string;
  publishTime: string;
  url: string;
  mv: string;
  lyric: string;
  isLike: boolean;
  isPlay: boolean;
  isShow: boolean;
};

export interface IState {
  // hasMore: boolean;
  songCount: number;
  songs: songType[];
}
