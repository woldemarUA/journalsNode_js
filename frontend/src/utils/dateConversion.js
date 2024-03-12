export const dateConvert = (str) => {
  const date = new Date(str);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // to display hour in 24-hour format
    timeZone: 'UTC', // Assuming the date is in UTC timezone
  };

  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
  return formattedDate;
};
