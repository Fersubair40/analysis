import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Spin,
  Alert,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import splash from "../images/splash.png";
import Api from "../api/api";

export default function Login({ history }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const success = () => {
    message.success("Login success");
  };

  const onFinish = async (values) => {
    setLoading(true);
    delete values.remember;

    const response = await Api.authenticate({ user: values });
    if (response && response.status === 200) {
        console.log(response)
       success();
    setTimeout(() => {
        history.push("dashboard");
    }, 3000)
    
    } else {
      setError(response.data.message);
    }
    setLoading(false);
  };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };

  return (
    <>
      <Spin spinning={loading} size="large">
        <Row justify="space-around" align="middle">
          <Col xs={0} lg={16}>
            <img className="splash" src={splash} alt="" />
          </Col>
          <Col xs={24} lg={8} className="form">
            <Col>
              <div>
                <h1 className="text">Welcome Back!</h1>
                <h2 className="text">
                  Fill in your login credentials to
                  <span>pick up where you left off</span>
                </h2>
              </div>
            </Col>
            {error && (
              <Alert className="mb" message={error} type="error" showIcon />
            )}

            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                className="form-radius"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined className="site-form-item-icon login-input" />
                  }
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={
                    <LockOutlined className="site-form-item-icon login-input" />
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
