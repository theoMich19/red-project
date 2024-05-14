import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import "dayjs/locale/fr.js";

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.locale("fr");

export const getTodayDate = () => {
  return dayjs().format("DD MMMM YYYY");
};

export const formatDate = (
  date: string,
  dateFormat: string = "DD MMMM YYYY"
) => {
  return dayjs(date).format(dateFormat);
};
