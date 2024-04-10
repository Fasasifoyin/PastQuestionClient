import dayjs from "dayjs";

const getRemaining = (nowDayjs, timeStampDayjs) => {
  const seconds = timeStampDayjs.diff(nowDayjs, "seconds") % 60;
  const minutes = timeStampDayjs.diff(nowDayjs, "minutes") % 60;
  const hours = timeStampDayjs.diff(nowDayjs, "hours");

  return {
    seconds: seconds > 9 ? `${seconds}` : `0${seconds}`,
    minutes: minutes > 9 ? `${minutes}` : `0${minutes}`,
    hours: hours > 9 ? `${hours}` : `0${hours}`,
  };
};

export const getRemainingTime = (timeStamp) => {
  const timeStampDayjs = dayjs(timeStamp);
  const nowDayJs = dayjs();

  if (timeStampDayjs.isBefore(nowDayJs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      timeUp: true,
    };
  }

  const { seconds, minutes, hours } = getRemaining(nowDayJs, timeStampDayjs);

  return {
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    timeUp: false,
  };
};
