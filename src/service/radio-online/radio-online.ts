import qingtingFMFile from "@/assets/csv/qingtingFM.csv?raw";
import foshanFile from "@/assets/csv/radiofoshan.csv?raw";
import ximalayaFile from "@/assets/csv/广东地区电台_喜马拉雅_aac64.csv?raw";
import hongkongFile from "@/assets/csv/香港电台.csv?raw";
import radioChinaFile from "@/assets/csv/全国广播电台2025.csv?raw";
import { csvToJson } from "@/utils/csvToJson";

export function getQingtingFM() {
  return csvToJson(qingtingFMFile);
}
export function getFoshanRadio() {
  return csvToJson(foshanFile);
}
export function getXimalaya() {
  return csvToJson(ximalayaFile);
}

export function getHongkongRadio() {
  return csvToJson(hongkongFile);
}

export function getRadioChina() {
  return csvToJson(radioChinaFile);
}
