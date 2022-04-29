import React, { Children, useState, useCallback, useMemo } from "react";
import dummyEvents from "../../util/dummyEvents";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventDrawer from "./EventDrawer";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Modal } from "antd";
import Event from "./Event";

export default function Calender() {
  const [allDayEvent, setAllDayEvent] = useState(true);
  const [currentView, setCurrentView] = useState("month");
  const [event, setEvent] = useState(null);
  const [slotInfo, setSlotInfo] = useState(null);
  const [editEventInfo, setEditEventInfo] = useState(false);
  const localizer = momentLocalizer(moment);
  const defaultDate = useMemo(() => new Date(2015, 3, 1), []);
  const handleSelectEvent = useCallback((event) => {
    setEvent(event);
    setEventModalVisible(true);
  }, []);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const onSelectSlot = useCallback((slotInfo) => {
    // if(currentView === "month"){

    // }
    setSlotInfo(slotInfo);
    setEventModalVisible(true);
  }, []);
  const onClose = () => {
    setEventModalVisible(false);
    setEvent(null);
    setSlotInfo(null);
    setEditEventInfo(false);
  };
  const onEventAction = () => {
    setEditEventInfo(true);
  };

  const onViewChange = (view) => {
    setCurrentView(view);
    if (view !== "month") {
      setAllDayEvent(false);
    } else {
      setAllDayEvent(true);
    }
  };

  return (
    <div className="bg-white rounded shadow-lg h-calender p-6 ">
      <Calendar
        defaultDate={defaultDate}
        localizer={localizer}
        defaultView="month"
        startAccessor="start"
        events={dummyEvents}
        endAccessor="end"
        popup
        onSelectEvent={handleSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        onView={onViewChange}
      />
      <Modal
        visible={eventModalVisible}
        title={event ? event.title : "Create a new account"}
        onCancel={onClose}
        width={800}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={() => onClose()}>
            Close
          </Button>,

          <Space className="ml-2">
            {editEventInfo ? (
              <Button key="submit" type="primary" onClick={() => onClose()}>
                Save
              </Button>
            ) : (
              <Button
                key="submit"
                type="primary"
                onClick={() => (event ? onEventAction() : onClose())}
              >
                {event ? "Edit" : "Submit"}
              </Button>
            )}
          </Space>,
        ]}
      >
        <Event event={event} slot={slotInfo} allDayEvent={allDayEvent} />
      </Modal>
      {/* <Drawer
       mask={false}
       closable={false}
        title={event ? event.title : "Create a new account"}
        width={720}
        onClose={() => onClose()}
        visible={eventDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button onClick={() => onClose()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Event data={event}/>
      </Drawer> */}
    </div>
  );
}
