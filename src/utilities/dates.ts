export const fetchTodaysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// export const getCurrentMonthFirstDate = () => {
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;
//   const together = [currentYear, currentMonth, ("0" + "1").slice(-2)].join("-");
//   return together;
// };

export const getCurrentMonthFirstDate = () => {
  const currentDate = new Date();
  currentDate.setDate(1); // Set the day to the first day of the current month
  const formattedDate = currentDate.toISOString().split('T')[0];
  return formattedDate;
};


export const getFormatedDate = (timestamp: any) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
