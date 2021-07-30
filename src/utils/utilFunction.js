export const covertMMDDYYYY = (date) => {
  const dateFormat = new Date(date);
  return dateFormat
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
};

export const convertDatesFormat = (format, seperator, date) => {
  let newDate = new Date(date);
  let dd = newDate.getDate();

  let mm = newDate.getMonth() + 1;
  const yyyy = newDate.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  switch (format) {
    case "mmddyyyy":
      return `${mm}${seperator}${dd}${seperator}${yyyy}`;
    case "ddmmyyyy":
      return `${mm}${seperator}${dd}${seperator}${yyyy}`;
    default:
      return newDate;
  }
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
    return date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  } else {
    return "-";
  }
};

export const localISOTime = () => {
  let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  let localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  return localISOTime;
};
