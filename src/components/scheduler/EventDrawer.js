import React, { useState, useEffect } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from "antd";
import Recipe from "../recipes/Recipe";

export default function EventDrawer(props) {
  const linkDetails = props.data;

  const [visible, setVisible] = useState(props.visible);
  useEffect(() => {
    setVisible(props.visible);
  }, [props]);

  const onClose = () => {
    setVisible(false);
    props.CloseLink();
  };
  return (
    <>
      {linkDetails && (
        <Drawer
          title={linkDetails.title}
          onClose={() => onClose()}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          mask={false}
          closable={false}
          extra={
            <Space>
              <Button onClick={() => onClose()}>Close</Button>
            </Space>
          }
        >
          <Recipe recipeId={linkDetails.linkId}/>
        </Drawer>
      )}
    </>
  );
}
