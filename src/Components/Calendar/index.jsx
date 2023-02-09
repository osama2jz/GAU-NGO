import { Calendar } from "@mantine/dates";
import { useState } from "react";

function CalendarDate() {
    const [calenderValue, setCalendarValu] = useState(new Date());
  return (
    <Calendar
    value={calenderValue}
    onChange={setCalendarValu}
    // month={value}
    fullWidth
    size="md"
    styles={(theme) => ({
      calendarBase:{padding: "10px"},
      selected: { color: "red" },
      cell: {
        border: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      },
      day: { borderRadius: 0, height: 50, fontSize: theme.fontSizes.md, border: `1px solid ${theme.colors.gray}`, },
      weekday: { fontWeight: "bold" },
      calendarHeader: {size: "lg"},
      weekdayCell: {
        fontSize: "20px",
        backgroundColor: theme.colors.grayDark,
        border: `1px solid ${theme.colors.gray}`,
        height: 40,
      },
    })}
  />
  )
}

export default CalendarDate