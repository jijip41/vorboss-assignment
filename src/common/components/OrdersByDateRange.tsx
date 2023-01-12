import { useState } from "react"
import DatePicker from "react-datepicker"

import { CalendarContainer } from "./CalendarContainer"
import { getOrdersByDateRange } from "../helper/getOrders"
import { Order } from "../helper/getSectionDetails"

export function OrdersByDateRange({ orders }: { orders: Order[] }) {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [ordersByRange, setOrdersByRange] = useState([])

  const handleStartDateChange = (date: Date) => {
    setStartDate(date)
    setOrdersByRange(getOrdersByDateRange(orders, date, endDate))
  }

  const handleEndDateChange = (date: Date) => {
    setEndDate(date)
    setOrdersByRange(getOrdersByDateRange(orders, startDate, date))
  }

  return (
    <div className="flex-row">
      <div className="calendar-row-left">
        <p className="padding-x-small">From: </p>

        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          onCalendarClose={() => handleStartDateChange(startDate)}
          calendarContainer={() => CalendarContainer(startDate, setStartDate)}
          shouldCloseOnSelect={true}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="calendar-row-left">
        <p className="padding-x-small">To: </p>
        <DatePicker
          selected={endDate}
          onCalendarClose={() => handleEndDateChange(endDate)}
          onChange={handleEndDateChange}
          calendarContainer={() => CalendarContainer(endDate, setEndDate)}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="flex-row-center card-value">{ordersByRange.length}</div>
    </div>
  )
}
