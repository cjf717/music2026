declare module "APlayer" {
  export interface AudioItem {
    name: string;
    artist: string;
    url: string;
    cover?: string;
    lrc?: string;
  }

  export interface APlayerOptions {
    container: HTMLElement;
    fixed?: boolean;
    autoplay?: boolean;
    theme?: string;
    loop?: "all" | "one" | "none";
    order?: "list" | "random";
    preload?: "none" | "metadata" | "auto";
    volume?: number;
    listFolded?: boolean;
    listMaxHeight?: string;
    audio: AudioItem[];
  }

  export default class APlayer {
    constructor(options: APlayerOptions);
    destroy(): void;
    play(): void;
    pause(): void;
    seek(time: number): void;
    toggle(): void;
    readonly status: "play" | "pause";
    readonly currentTime: number;
    readonly duration: number;
    list: {
      add(audio: AudioItem[]): void;
      remove(index: number): void;
      clear(): void;
    };
  }
}
