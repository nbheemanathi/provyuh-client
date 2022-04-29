import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from "antd";

export default function EventDrawer(props) {
    console.log(props);
  const [visible, setVisible] = useState(props.visible);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Drawer
      title="Create a new account"
      width={720}
      onClose={() => onClose()}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      mask={false}
      closable={false}
      extra={
        <Space>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => onClose()} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
