import dayjs from "dayjs";
export function formatTime(time: number | string, format = "YYYY-MM-DD HH:mm:ss") {
  if (typeof time === "string") {
    time = Number(time);
  }
  return dayjs(time).format(format);
}
