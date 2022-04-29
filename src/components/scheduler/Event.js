import React, { useState, useEffect } from "react";
import { Drawer, Form, TimePicker, Col, Space, Input, Select, DatePicker, Checkbox } from "antd";
import { Radio, Cascader, InputNumber, TreeSelect, Switch } from "antd";
import moment from "moment";

export default function Event(props) {
  const { RangePicker } = DatePicker;
  const event = props.event;
  const slot = props.slot;
  const timeFormat = "h:mm A";

  const [allDayEvent, setAllDayEvent] = useState(props.allDayEvent);
  const [multiDayEvent, setMultiDayEvent] = useState(false);
  const onDateChange = (value) => {
    console.log(value);
  };
  const [currentEvent, setCurrentUser] = useState({
    title: null,
    type: null,
    start: slot ? moment(slot.start) : null,
    dates: slot ? [moment(slot.start), moment(slot.end)] : null,
    allDayEvent: props.allDayEvent,
    times: slot
      ? [
          moment(moment(slot.start).format(timeFormat), "h:mm A"),
          moment(moment(slot.end).format(timeFormat), "h:mm A"),
        ]
      : null,
  });

  const customFormat = (value) => {
    return moment(value).format("dddd ll");
  };

  useEffect(() => {
    if (slot && slot.slots.length > 1) {
      if (moment(slot.slots[0]).format("L") !== moment(slot.slots[1]).format("L")) {
        setMultiDayEvent(true);
      }
    }
  }, [slot, event]);
  const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  return (
    <div>
      {event ? (
        <>{event.title}</>
      ) : (
        <Form
          {...formItemLayout}
          layout="horizontal"
          initialValues={currentEvent}
          onValuesChange={(values) => console.log(values)}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="event">Event</Select.Option>
              <Select.Option value="task">Task</Select.Option>
              <Select.Option value="remainder">Remainder</Select.Option>
              <Select.Option value="recipe">Recipe</Select.Option>
              <Select.Option value="workOut">WorkOut</Select.Option>
            </Select>
          </Form.Item>
          {!multiDayEvent ? (
            <Form.Item label="Date" style={{ marginBottom: 0 }}>
              <Form.Item name="start" style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
                <DatePicker format={customFormat} />
              </Form.Item>
              {!allDayEvent && (
                <Form.Item
                  name="times"
                  style={{ display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px" }}
                >
                  <TimePicker.RangePicker use12Hours format={timeFormat} />
                </Form.Item>
              )}
            </Form.Item>
          ) : (
            // <Space wrapperCol={{ offset: 8, span: 16 }}>
            //   <Form.Item label="Date" name="start" >
            //     <DatePicker format={customFormat} />
            //   </Form.Item>
            //   <Form.Item name="times" >
            //   <TimePicker.RangePicker />
            //   </Form.Item>
            // </Space>
            <Form.Item label="Date" name="dates">
              <RangePicker
                ranges={{
                  Today: [moment().startOf("day"), moment().endOf("day")],
                  "This Week": [moment().startOf("week"), moment().endOf("week")],
                  "This Month": [moment().startOf("month"), moment().endOf("month")],
                }}
                showTime
                format={customFormat}
                onChange={onDateChange}
              />
            </Form.Item>
          )}
          <Form.Item
            name="allDayEvent"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Checkbox>All Day Event</Checkbox>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
