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
