import dayjs from "dayjs";
export function formatTime(time: number | string, format = "YYYY-MM-DD HH:mm:ss") {
  if (typeof time === "string") {
    time = Number(time);
  }
  return dayjs(time).format(format);
}
// 把秒转化为分秒格式
export function formatNumberToTime(time: number | string) {
  if (typeof time === "string") {
    time = Number(time);
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
