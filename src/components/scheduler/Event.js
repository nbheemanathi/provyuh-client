import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  TimePicker,
  Space,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Tag,
  message,
} from "antd";
import moment from "moment";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  FETCH_USER_LIKED_RECIPES,
  ADD_EVENT_MUTATION,
  FETCH_USER_EVENTS,
} from "../../util/graphql";

export default function Event(props) {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const event = props.event;
  console.log(event);
  const slot = props.slot;
  const user = props.user;
  const timeFormat = "h:mm A";
  const [multiDayEvent, setMultiDayEvent] = useState(false);
  const onDateChange = (value) => {};
  const { Option } = Select;
  const confirmAllDayEvent = () => {
    if (slot) {
      if (slot.slots.length === 1) {
        return true;
      }
      if (slot.slots.length > 1) {
        if (moment(slot.slots[0]).format("L") !== moment(slot.slots[1]).format("L")) {
          return true;
        }
      }
    }
    return false;
  };
  const [currentEvent, setCurrentEvent] = useState({
    title: null,
    type: null,
    recipe: null,
    notes: null,
    start: slot ? moment(slot.start).startOf("day") : null,
    dates: slot ? [moment(slot.start).startOf("day"), moment(slot.end).startOf("day")] : null,
    allDayEvent: confirmAllDayEvent(),
    times: slot ? [moment(slot.start), moment(slot.end)] : null,
  });
  const [eventType, setEventType] = useState(null);
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
  const [fetchRecipes, { data: recipeData }] = useLazyQuery(FETCH_USER_LIKED_RECIPES);
  const [recipes, setRecipes] = useState(null);
  const [recipeOptions, setRecipeOptions] = useState(null);
  const onEventTypeChange = async (type) => {
    setEventType(type);
    if (type === "recipe") {
      await fetchRecipes({ variables: { userId: user.id } });
    }
  };
  const renderRecipeOptions = (data) => {
    const options = data.map((d) => <Option key={d.recipeId}>{d.title}</Option>);
    setRecipeOptions(options);
  };
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [linkTags, setLinkTags] = useState(null);
  useEffect(() => {
    if (recipeData) {
      setRecipes(recipeData.getUserLikedRecipes);
      if (selectedRecipes.length === 0) {
        renderRecipeOptions(recipeData.getUserLikedRecipes);
      } else {
        const filteredRecipeOptions = recipeData.getUserLikedRecipes.filter(
          (o) => !selectedRecipes.includes(o.recipeId)
        );
        renderRecipeOptions(filteredRecipeOptions);
      }
      renderRecipeTags();
    }
  }, [recipeData, selectedRecipes]);
  const renderRecipeTags = () => {
    const recipesList = recipeData.getUserLikedRecipes.filter((s) =>
      selectedRecipes.includes(s.recipeId)
    );
    setLinkTags(recipesList);
  };
  const handleRecipeOnChange = async (value) => {
    setSelectedRecipes((preState) => [...preState, parseInt(value)]);
    form.setFieldsValue({ recipe: null });
  };
  const removeLink = (link) => {
    let filteredRecipes = selectedRecipes.filter((item) => item !== link.recipeId);
    setSelectedRecipes(filteredRecipes);
  };
  const onSubmit = (data) => {
    if (data.type === "recipe") {
      if (linkTags.length === 0) {
        message.warning({
          content: "please add a recipe !",
          duration: 4,
          style: {
            position: "absolute",
            top: "80px",
            right: "30px",
            padding: "10px",
          },
        });
        return;
      }
    }

    let variables = {
      title: data.title,
      allDay: data.allDayEvent,
      notes: data.notes,
      type: data.type,
    };
    if (data.allDayEvent) {
      if (data.dates === undefined) {
        variables.start = data.start;
        variables.end = data.start;
      } else {
        variables.start = data.dates[0];
        variables.end = data.dates[1];
      }
    } else {
      var startDate = data.start.format();
      var endDate = data.start.format();
      variables.start = moment(startDate).set({
        hour: data.times[0].get("hour"),
        minute: data.times[0].get("minute"),
      });
      variables.end = moment(endDate).set({
        hour: data.times[1].get("hour"),
        minute: data.times[1].get("minute"),
      });
    }
    if (linkTags) {
      let linkInfo = [];
      linkTags.map((link) => {
        linkInfo.push({ linkId: link.recipeId, title: link.title, imageUrl: link.imageUrl }); // this will be changing when we add workouts
      });
      variables.links = linkInfo;
    }
    addEvent({
      variables: variables,
    });
  };

  const [addEvent] = useMutation(ADD_EVENT_MUTATION, {
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_USER_EVENTS,
      });
      if (data) {
        const newEvent = result.data.addEvent;
        const updatedEvents = [...data.getUserEvents, newEvent];
        cache.writeQuery({
          query: FETCH_USER_EVENTS,
          data: { getUserEvents: updatedEvents },
        });
      }
    },
    onCompleted() {
      message.success({
        content: "Event Added Successfully",
        duration: 4,
        className: "notification_message",
      });
      props.onClose();
    },
  });

  return (
    <div>
      {event ? (
        <>
          <div className="mb-3">
            <h2 className="mb-2 font-medium text-xl text-slate-800">{event.title}</h2>
            <div className="text-sm font-medium mb-2 text-gray-500">
              {event.allDay ? (
                <>{moment(event.start).format("dddd ll")}</>
              ) : (
                <>
                  {moment(event.start).format("dddd ll")} ・ {moment(event.start).format("h:mm")} -
                  {moment(event.end).format("LT")}
                </>
              )}
            </div>
            <div className="text-sm">{event.notes}</div>

            <div className="my-2">
              {event.links.length > 0 &&
                event.links.map((d) => (
                  <Tag
                    className="inline-flex items-center cursor-pointer"
                    onClick={() => {
                      props.showLinkDetails(d)
                    }}
                  >
                    {d.title}
                  </Tag>
                ))}
            </div>
          </div>
        </>
      ) : (
        <Form
          {...formItemLayout}
          form={form}
          layout="horizontal"
          initialValues={currentEvent}
          onValuesChange={(values) => {}}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type is required!" }]}
          >
            <Select onChange={(value) => onEventTypeChange(value)}>
              <Select.Option value="event">Event</Select.Option>
              <Select.Option value="task">Task</Select.Option>
              <Select.Option value="remainder">Remainder</Select.Option>
              <Select.Option value="recipe">Recipe</Select.Option>
              <Select.Option value="workOut">WorkOut</Select.Option>
            </Select>
          </Form.Item>
          {eventType && eventType === "recipe" && (
            <Form.Item label="Recipe" name="recipe">
              <Select
                showSearch
                placeholder={"Search Recipes"}
                showArrow={false}
                notFoundContent={null}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={handleRecipeOnChange}
              >
                {recipeOptions}
              </Select>
            </Form.Item>
          )}
          <div className={linkTags?.length > 0 && "ml-28 mb-2 -mt-4"}>
            {linkTags?.length > 0 &&
              linkTags.map((d) => (
                <Tag
                  closable
                  className="m-3 inline-flex items-center"
                  onClose={() => removeLink(d)}
                >
                  {d.title}
                </Tag>
              ))}
          </div>

          {!multiDayEvent ? (
            <Form.Item label="Date" style={{ marginBottom: 0 }}>
              <Form.Item name="start" style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
                <DatePicker format={customFormat} />
              </Form.Item>
              {!currentEvent.allDayEvent && (
                <Form.Item
                  name="times"
                  style={{ display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px" }}
                >
                  <TimePicker.RangePicker use12Hours format={timeFormat} />
                </Form.Item>
              )}
            </Form.Item>
          ) : (
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
          <Form.Item name="notes" label="Notes">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="allDayEvent"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Checkbox>All Day Event</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 17, span: 18 }}>
            <Space>
              <Button htmlType="button" onClick={() => props.onClose()}>
                Close
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
