/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getRemainingTime } from "../utils/CountdownTimerUtils";
import { Box } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { changeTimeUp } from "../app/slice/frontend";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  timeUp: false,
};

const Timer2 = ({ duration }) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(defaultRemainingTime);

  const updateTime = (timerDuration) => {
    setTime(getRemainingTime(timerDuration));
  };

  useEffect(() => {
    const dt = new Date();
    const dt2 = new Date(dt.getTime() + duration);
    const timeStamp = dt2.getTime();

    const intervalId = setInterval(() => {
      updateTime(timeStamp);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [duration]);

  useEffect(() => {
    if (time.timeUp) {
      dispatch(changeTimeUp(true));
    }
  }, [dispatch, time.timeUp]);

  return (
    <Box p={"7px"} bg={"#ce151f"} color={"white"} borderRadius={"5px"}>
      <p>{`${time.hours}:${time.minutes}:${time.seconds}`}</p>
    </Box>
  );
};

export default Timer2;
