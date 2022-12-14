import Calendar from 'react-calendar';

export default function CalendarContainer(date, callback) {
  return (
    <div>
      <Calendar
        onChange={(data) => callback(data)}
        onClick={(data) => callback(data)}
        value={date}
      />
    </div>
  );
}
