import React, { useState } from "react";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

// eslint-disable no-undef


const range = (start, end, step = 1) => {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({ length }, (_, i) => start + (i * step));
  };
  
const getYear = (date) => date.getFullYear();

const getMonth = (date) => date.getMonth();

const BaseDatePicker = ({ selected, onChange }) => {
    const date = selected !== '' ? (new Date(selected)) : (new Date());
  const [startDate, setStartDate] = useState(date);
  const years = range(1900, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const onChangeDate = (date) => {
    onChange(date);
    setStartDate(date);
  };

  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => onChangeDate(date)}
      dateFormat="yyyy-MM-dd"
      isClearable
      className="border-0 bg-transparent"
      showIcon
      icon={faCalendar}
      todayButton="Fecha Actual"
    />
  );
};

export default BaseDatePicker;
