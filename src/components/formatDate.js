const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const formatDateV2 = (dateString) => {
  const dateObject = new Date(Date.parse(dateString));
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const formattedDate = `${month.toString().padStart(2, "0")}-${year}`;
  return formattedDate;
};

export { formatDate, formatDateV2 };
