import React, { useState, useCallback, useMemo, useContext, useEffect } from "react";
import dummyEvents from "../../util/dummyEvents";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Modal } from "antd";
import Event from "./Event";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";
import { FETCH_USER_EVENTS } from "../../util/graphql";
import EventDrawer from "./EventDrawer";

export default function Calender() {
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [slotInfo, setSlotInfo] = useState(null);
  const [editEventInfo, setEditEventInfo] = useState(false);
  const [linkDetails, setLinkDetails] = useState(null);
  const localizer = momentLocalizer(moment);
  const { loading, data: eventData } = useQuery(FETCH_USER_EVENTS, {
    pollInterval: 60000,
  });
  const defaultDate = useMemo(() => new Date(2015, 3, 1), []);
  const handleSelectEvent = useCallback((event) => {
    setEvent(event);
    setEventModalVisible(true);
  }, []);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const onSelectSlot = useCallback((slotInfo) => {
    setSlotInfo(slotInfo);
    setEventModalVisible(true);
  }, []);
  const onClose = () => {
    setLinkDetails(null)
    setEventModalVisible(false);
    setEvent(null);
    setSlotInfo(null);
    setEditEventInfo(false);
  };
  const onEventAction = () => {
    setEditEventInfo(true);
  };
  const [calendarData, setCalendarData] = useState(null);
  useEffect(() => {
    if (eventData) {
      const eData = eventData.getUserEvents.map((event) => {
        const { start, end, ...data } = event;
        return Object.assign({}, { ...data }, { start: new Date(start), end: new Date(end) });
      });
      setCalendarData(eData);
    }
  }, [eventData]);

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        // backgroundColor: "lightBlue",
      },
    });
  const components = useMemo(
    () => ({
      timeSlotWrapper: ColoredDateCellWrapper,
    }),
    []
  );
  return (
    <div className="bg-white rounded shadow-lg h-calender p-6 ">
      {!loading && calendarData && (
        <Calendar
          // defaultDate={defaultDate}
          // components={components}
          localizer={localizer}
          defaultView="month"
          startAccessor="start"
          events={calendarData}
          endAccessor="end"
          popup
          onSelectEvent={handleSelectEvent}
          onSelectSlot={onSelectSlot}
          selectable
        />
      )}
      <Modal
        visible={eventModalVisible}
        title={event ? event.title : "Add New"}
        onCancel={() => onClose()}
        width={event ? 400 : 800}
        destroyOnClose={true}
        footer={false}
      >
        <Event
          event={event}
          user={user}
          slot={slotInfo}
          onClose={() => onClose()}
          showLinkDetails={(link) => setLinkDetails(link)}
        />
      </Modal>
      <EventDrawer visible={!linkDetails ? false : true} data={linkDetails} CloseLink={() => setLinkDetails(null)} />
    </div>
  );
}
