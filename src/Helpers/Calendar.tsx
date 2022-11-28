import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateNow, DateNowFormat } from "./getDate_Hour";

const Calendar = () => {
  const [startDate, setStartDate] = useState(DateNowFormat);
  //console.log(startDate);

  const handleChange = (date: any) => {
    setStartDate(date);
  };

  const handleDateSelect = (date: any) => {
    //console.log(date);
  };
  return (
    <div className="calendar">
      <DatePicker
        selected={startDate}
        onSelect={handleDateSelect}
        onChange={handleChange}
      />
    </div>
  );
};

export default Calendar;
