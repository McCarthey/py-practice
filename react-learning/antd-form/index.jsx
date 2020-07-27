import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, Switch } from "antd";

const AntdForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = values => {
    if (typeof values.switch === "boolean") {
      values.switch = values.switch ? 1 : 0;
    }
    console.log("[suubmit]", values);
    // TODO: 发送请求
  };

  return (
    <Form form={form} name="dynamic_rule" onFinish={handleSubmit}>
      <Form.Item name="username" label="Name">
        <Input placeholder="Please input your name" />
      </Form.Item>
      <Form.Item name="nickname" label="Nickname">
        <Input placeholder="Please input your nickname" />
      </Form.Item>
      <Form.Item name="switch" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AntdForm
