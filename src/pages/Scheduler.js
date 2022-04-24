import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import dummyEvents from "../util/dummyEvents";
import Calender from "../components/scheduler/Calender";

export default function Scheduler() {
  return (
    <div className="h-full overflow-hidden">
      <h1 className="mb-2 text-base font-medium text-red-300">
        Work in progress!! Users can maintain meal, workout plans and schedule their events in one
        place
      </h1>
      <Calender />
    </div>
  );
}
