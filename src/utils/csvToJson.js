/**
 * 将CSV字符串转换为JSON数组
 * @param csv - CSV格式的字符串
 * @param delimiter - 分隔符，默认为逗号
 * @returns 转换后的JSON对象数组
 */
export function csvToJson(csv, delimiter = ",") {
    // 按行分割CSV数据
    const lines = csv.split(/\r?\n/).filter((line) => line.trim() !== "");
    if (lines.length === 0) {
        return [];
    }
    // 获取标题行
    const headers = parseLine(lines[0], delimiter);
    // 处理数据行
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const currentLine = parseLine(lines[i], delimiter);
        if (currentLine.length > 0) {
            const obj = {};
            // 将每个字段与对应标题匹配
            headers.forEach((header, index) => {
                // 移除可能存在的引号并去除首尾空格
                const value = currentLine[index] ? cleanValue(currentLine[index]) : "";
                obj[header] = value;
            });
            result.push(obj);
        }
    }
    return result;
}
/**
 * 解析单行CSV数据，处理带引号的字段
 * @param line - 单行CSV数据
 * @param delimiter - 分隔符
 * @returns 解析后的字段数组
 */
function parseLine(line, delimiter) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            // 如果是连续两个双引号，则表示一个实际的双引号字符
            if (i + 1 < line.length && line[i + 1] === '"') {
                current += '"';
                i++; // 跳过下一个双引号
            }
            else {
                inQuotes = !inQuotes;
            }
        }
        else if (char === delimiter && !inQuotes) {
            result.push(current);
            current = "";
        }
        else {
            current += char;
        }
    }
    result.push(current);
    return result;
}
/**
 * 清理值：移除引号并去除首尾空格
 * @param value - 待清理的值
 * @returns 清理后的值
 */
function cleanValue(value) {
    // 移除首尾的引号（如果存在）
    let cleaned = value.trim();
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.substring(1, cleaned.length - 1);
    }
    return cleaned;
}
