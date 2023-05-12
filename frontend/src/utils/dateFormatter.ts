// 日時を yyyy/mm/dd hh:mm の文字列に変換
const dateFormatter = (date: Date): string => {
  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  return formattedDate;
};

export default dateFormatter;
