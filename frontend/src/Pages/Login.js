import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Card, Alert } from "antd";
import "../css/mydiv.css";
import Layout, { Header, Body, Content } from "antd/lib/layout/layout";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: "",
      shouldHide: true,
    };
    sessionStorage.setItem("login", "false");
    sessionStorage.setItem("info", "");
  }

  onFinish = async (values) => {
    sessionStorage.setItem("login", "true");
    try {
      let res = await axios.get(
        process.env.REACT_APP_OXYGEN_APP_URL +
          "/user/username/" +
          values.username,
        {
          auth: {
            username: process.env.REACT_APP_TOKEN_USERNAME,
            password: process.env.REACT_APP_TOKEN_PASSWORD,
          },
        }
      );
      if (values.password == res.data.passwd) {
        console.log(res);
        delete res.data["passwd"];
        sessionStorage.setItem("info", JSON.stringify(res.data));
        this.setState({ redirect: "home" });
      } else {
        this.onFinishFailed("Wrong Password");
        this.setState({ shouldHide: false });
      }
    } catch (e) {
      console.log("catch");
      this.setState({ shouldHide: false });
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  registerHandler = () => {
    this.setState({ redirect: "register" });
  };

  render() {
    if (this.state.redirect == "home") {
      return <Redirect push to="/" />;
    } else if (this.state.redirect == "register") {
      return <Redirect push to="/register" />;
    }

    return (
      <Layout>
        <Header></Header>
        <Content>
          <br></br>
          <h1>Login</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => this.loginHandler}
              >
                Login
              </Button>

              <Button
                htmlType="button"
                disabled
                style={{
                  margin: "8px",
                }}
                onClick={() => this.registerHandler()}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <Alert
            className={this.state.shouldHide ? "hidden" : null}
            message="Username ???????????? Password ????????? ????????????????????????????????????????????????"
            type="error"
          />
        </Content>
      </Layout>
    );
  }
}

export default Login;
