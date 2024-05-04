"use client";

import { MouseEvent, useEffect, useState } from "react";

interface TimePickerProps {
  value: string;
  onChange: (...event: any[]) => void;
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");

  const currentTime = (e: MouseEvent<HTMLButtonElement>) => {
    const now = new Date();
    setHour(
      now.getHours.toString().length === 1
        ? "0" + now.getHours().toString()
        : now.getHours().toString()
    );
    setMinute(
      now.getMinutes.toString().length === 1
        ? "0" + now.getMinutes().toString()
        : now.getMinutes().toString()
    );
  };

  const getTime = value.split(":");
  useEffect(() => {
    setHour(getTime[0]);
    setMinute(getTime[1]);
  }, []);
  return (
    <div>
      {hour} - {minute}
      <button onClick={currentTime}>Now</button>
    </div>
  );
};
