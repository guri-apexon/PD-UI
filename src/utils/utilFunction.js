import moment from "moment";
export const convertData = (date) => {
  var a = moment(date, "YYYYMMDD");
  return a.format("DD-MMM-YYYY");
};

export const covertMMDDYYYY = (date) => {
  console.log("coming", date);
  const someday = moment(date);
  return someday.format("DD-MMM-YYYY");
};

export const formatESDate = (date)=>{
    console.log("ES coming", date);
    
    var str = date;
    var year = str.substring(0, 4);
    var month = str.substring(4, 6);
    var day = str.substring(6, 8);
    var hour = str.substring(8, 10);
    var minute = str.substring(10, 12);
    var second = str.substring(12, 14);
    var date = new Date(year, month - 1, day, hour, minute, second);
    console.log(moment(date).format("DD-MMM-YYYY"));
    return moment(date).format("DD-MMM-YYYY");
  
}