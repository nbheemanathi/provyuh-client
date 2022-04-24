import React,{useCallback,useMemo} from "react";
import dummyEvents from "../../util/dummyEvents";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

export default function Calender() {
  const localizer = momentLocalizer(moment);
  const defaultDate = useMemo(() => new Date(2015, 3, 1), []);
  const handleSelectEvent = useCallback(
    (event) => {console.log(event);},
    []
  )
  return (
    <div className="bg-white rounded shadow-lg h-calender p-6 ">
      <Calendar
        defaultDate={defaultDate}
        localizer={localizer}
        startAccessor="start"
        events={dummyEvents}
        endAccessor="end"
        popup
        onSelectEvent={handleSelectEvent}

      />
    </div>
  );
}
