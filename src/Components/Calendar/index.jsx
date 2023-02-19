import { Calendar } from "@mantine/dates";
import { useState } from "react";
import moment from "moment/moment";
import { Indicator } from "@mantine/core";

const CalendarDate = ({ setDate, getSchedule, scheduleDates }) => {
  const [calenderValue, setCalendarValue] = useState(new Date());
  console.log(
    moment(new Date().setMonth(new Date().getMonth() + 1))
      .endOf("month")
      .format("DD MMMM YYYY")
  );
  return (
    <Calendar
      value={calenderValue}
      onChange={(v) => {
        setCalendarValue(v);
        setDate(moment(v).format("YYYY-MM-DD"));
        getSchedule.mutate(moment(v).format("YYYY-MM-DD"));
      }}
      minDate={new Date(new Date().setDate(new Date().getMonth()))}
      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2, 0))}
      fullWidth
      size="md"
      renderDay={(date) => {
        const day = date.getDate();
        return (
          <Indicator
            size={14}
            label="Duty"
            position="top-center"
            radius={"xs"}
            color="red"
            offset={8}
            disabled={!scheduleDates.includes(moment(date).format("YYYY-MM-DD"))}
          >
            <div>{day}</div>
          </Indicator>
        );
      }}
      styles={(theme) => ({
        calendarBase: { padding: "10px" },
        selected: { color: "red" },
        cell: {
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        },
        day: {
          borderRadius: 0,
          height: 50,
          fontSize: theme.fontSizes.md,
          border: `1px solid ${theme.colors.gray}`,
        },
        weekday: { fontWeight: "bold" },
        calendarHeader: { size: "lg" },
        weekdayCell: {
          fontSize: "20px",
          backgroundColor: theme.colors.grayDark,
          border: `1px solid ${theme.colors.gray}`,
          height: 40,
        },
      })}
    />
  );
};

export default CalendarDate;
