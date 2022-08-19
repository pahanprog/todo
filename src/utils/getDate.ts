// Функции возвращающие текущую дату в привычном формате

const date = new Date();

const getTimeOfDay = () => {
  const hours = date.getHours();

  if (hours < 12) {
    return "morning";
  } else if (hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
};

const getCurrentDay = (dateFrom?: Date) => {
  if (dateFrom) {
    return dateFrom.getUTCDate();
  } else {
    return date.getUTCDate();
  }
};

const getCurrentWeekDay = () => {
  switch (date.getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Thuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
};

const getCurrentMonth = (dateFrom?: Date) => {
  if (dateFrom) {
    switch (dateFrom.getMonth()) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
      default:
        return "";
    }
  } else {
    switch (date.getMonth()) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
      default:
        return "";
    }
  }
};

const getTime = (dateFrom: Date) => {
  return (
    dateFrom.getHours() + ":" + String(dateFrom.getMinutes()).padStart(2, "0")
  );
};

export {
  getTimeOfDay,
  getCurrentDay,
  getCurrentWeekDay,
  getCurrentMonth,
  getTime,
};
