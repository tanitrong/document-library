export const formatDate = (dateTo) => {
  const date = new Date(dateTo);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year} ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  return formattedDate;
};
const extractTime = (dateString) => {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
};
function padZero(number) {
  return number.toString().padStart(2, "0");
}

export { extractTime };
