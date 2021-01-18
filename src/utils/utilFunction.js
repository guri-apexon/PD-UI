import moment from "moment";
export const convertData = (date) => {
  var a = moment(date, "YYYYMMDD");
  return a.format("DD-MMM-YYYY");
};

export const covertMMDDYYYY = (date) => {
  console.log("coming", date);
  const someday = moment(date);
  return someday.format("MM-DD-YYYY");
};
