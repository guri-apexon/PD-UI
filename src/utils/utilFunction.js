import moment from "moment";
export const convertData = (date) => {
  let a = moment(date, "YYYYMMDD");
  return a.format("DD-MMM-YYYY");
};

export const covertMMDDYYYY = (date) => {
  const someday = moment(date);
  return someday.format("DD-MMM-YYYY");
};

export const formatESDate = (dateString) => {
  if (dateString.length > 7) {
    let str = dateString;
    let year = str.substring(0, 4);
    let month = str.substring(4, 6);
    let day = str.substring(6, 8);
    let hour = str.substring(8, 10);
    let minute = str.substring(10, 12);
    let second = str.substring(12, 14);
    let date = new Date(year, month - 1, day, hour, minute, second);
    // console.log(moment(date).format("DD-MMM-YYYY"));
    return moment(date).format("DD-MMM-YYYY");
  } else {
    return "-";
  }
};
