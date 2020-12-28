import moment from 'moment'
export const convertData = (date) =>{
    var a = moment(date, "YYYYMMDD");
    return a.format("DD-MMM-YYYY");
}