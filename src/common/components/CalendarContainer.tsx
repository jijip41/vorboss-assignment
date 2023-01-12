import { SetStateAction } from "react"
import { Calendar } from "react-calendar"

export function CalendarContainer(
  date: Date,
  callback: {
    (value: SetStateAction<Date>): void
    (value: SetStateAction<Date>): void
    (arg0: any): any
  }
) {
  return (
    <div>
      <Calendar
        onChange={(data: Date) => callback(data)}
        // onClick={data => callback(data)}
        value={date}
      />
    </div>
  )
}
