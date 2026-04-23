export type platformType = "蜻蜓FM" | "喜马拉雅" | "佛山电台" | "香港电台" | "全国电台";
export interface IRadio {
  id?: number;
  title: string;
  cover: string;
  platform: platformType;
  playUrl: string;
  电台?: string;
  类型?: string;
  城市?: string;
  地理位置?: string;
  官方网站?: string;
  节目表?: string;
}

export interface IRadioOnline {
  title: string;
  list: IRadio[];
}
export interface IRadioOnlineList {
  // id: number;
  // title: string;
  radioOnlineList: IRadioOnline[];
  playbills: any;
}
