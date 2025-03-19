import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isSameDay,
  isBefore,
} from "date-fns";
import { ka } from "date-fns/locale";
import { CalendarIcon, ChevronUp, ChevronDown } from "lucide-react";

export default function DateInput({
  name = "deadline",
  value,
  onChange,
  required = false,
  label = "დედლაინი",
  errorMessage,
}) {
  const tomorrow = addDays(new Date(), 1);
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : tomorrow,
  );
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date(),
  );
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  const handleDateClick = (day) => {
    setSelectedDate(day);

    const formattedDate = format(day, "yyyy-MM-dd");
    onChange({
      target: {
        name,
        value: formattedDate,
      },
    });

    setIsOpen(false);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-base font-medium">
          {format(currentMonth, "MMMM yyyy", { locale: ka })}
        </div>
        <div className="flex space-x-1">
          <button onClick={prevMonth} type="button" className="p-1">
            <ChevronUp className="h-5 w-5" />
          </button>
          <button onClick={nextMonth} type="button" className="p-1">
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვი"];
    return (
      <div className="mb-1 grid w-full grid-cols-7">
        {days.map((day, i) => (
          <div
            key={i}
            className="flex h-10 items-center justify-center text-center text-sm text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isDisabled = isBefore(day, today);
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

        days.push(
          <div
            key={day.toString()}
            className={`flex cursor-pointer items-center justify-center text-center ${
              isDisabled
                ? "cursor-not-allowed text-gray-300"
                : isSelected
                  ? "bg-purple-500 text-white"
                  : "hover:bg-white"
            } ${!isCurrentMonth ? "text-gray-400" : ""}`}
            onClick={() => !isDisabled && handleDateClick(cloneDay)}
            style={{
              backgroundColor: isSelected ? "#8239EC" : "#FFFFFF",
              borderRadius: isSelected ? "0.375rem" : "0",
            }}
          >
            {format(day, "d")}
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid w-full grid-cols-7">
          {days}
        </div>,
      );
      days = [];
    }

    return <div className="w-full">{rows}</div>;
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <label className="input__label">
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <div className="relative w-full">
        <div
          className="relative w-full cursor-pointer"
          onClick={toggleCalendar}
        >
          <input
            className="w-full cursor-pointer rounded-md border py-2 pr-4 pl-8 focus:border-purple-500 focus:outline-none"
            placeholder="DD.MM.YYYY"
            value={format(selectedDate, "dd.MM.yyyy")}
            readOnly
          />
          <CalendarIcon className="absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2 transform" />
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            {renderHeader()}
            <div className={"px-8"}>
              {renderDays()}
              {renderCells()}
            </div>
            <div className="flex justify-between p-4">
              <button
                className="cursor-pointer font-medium text-purple-500"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="cursor-pointer font-medium text-purple-500"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
      {errorMessage && <div className="text__error">{errorMessage}</div>}
    </div>
  );
}
