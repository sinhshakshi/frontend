import React, { useState, useEffect } from "react";

const Typingfreetime = ({ hoursMinSecs, rmTimeFun, onTimeUp }) => {
  const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      onTimeUp(); // Notify parent when time is up
      return;
    }
    if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(timerId);
  }, [secs]);

  useEffect(() => {
    const remainingTime = `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    rmTimeFun(remainingTime);
  }, [hrs, mins, secs, rmTimeFun]);

  return (
    <>
      {`${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
    </>
  );
};

export default Typingfreetime;
