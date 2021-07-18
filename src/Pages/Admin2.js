import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Card, Layout, Select } from "antd";
import SideBar from "../components/sidebar";
// import "../css/mydiv.css";
import { Header, Body, Content } from "antd/lib/layout/layout";

import Navbar from "../components/Navbar";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

function handleChangeName(name) {
  console.log(`selected user ${name}`);
}

function handleChangeRole(role) {
  console.log(`selected role ${role}`);
}

class Admin2 extends React.Component {
  constructor() {
    super();
    console.log("here");
    this.state = {
      redirect: "",
      usersAdmin: [],
      usersRescuer: [],
      usersAll: [],
      data2: {},
      data: {},
      data3: "x",
      user3: [],
    };
    axios.get("http://EC2Co-EcsEl-O4IIWNOGGYB-671549001.ap-southeast-1.elb.amazonaws.com:8080/user/type/1").then((ures) => {
      const usersAdmin = ures.data.content;
      this.setState({
        usersAdmin: ures.data.content,
      });
      axios.get("http://EC2Co-EcsEl-O4IIWNOGGYB-671549001.ap-southeast-1.elb.amazonaws.com:8080/user/type/2").then((ures) => {
        const usersRescuer = ures.data.content;
        this.setState({
          usersRescuer: ures.data.content,
          //usersAll: JSON.parse(usersAdmin, usersRescuer);
          usersAll: usersAdmin.concat(usersRescuer),
        });
      });
    });
  }

  onFinish = (values) => {
    this.setState({
      redirect: "dashboard",
      data: {
        type: values.role,
        name: values.name,
      },
    });

    /////////////////////////////////////////////// name is userId
    let id = this.state.data.name;
    console.log("here" + id);
    let url2 = "http://EC2Co-EcsEl-O4IIWNOGGYB-671549001.ap-southeast-1.elb.amazonaws.com:8080/user/" + this.state.data.name;
    axios.get(url2).then((ures) => {
      var data2 = {
        address: ures.data.address,
        firstName: ures.data.firstName,
        gender: ures.data.gender,
        id: ures.data.id,
        lastName: ures.data.lastName,
        location: ures.data.location,
        passwd: ures.data.passwd,
        phone: ures.data.phone,
        serviceDate: ures.data.serviceDate,
        serviceRequestDate: ures.data.serviceRequestDate,
        severity: ures.data.severity,
        status: ures.data.status,
        statusDate: ures.data.statusDate,
        type: this.state.data.type,
        userName: ures.data.userName,
      };

      // const myObj = JSON.parse(data2);

      console.log(this.state.data.type);
      console.log(data2);
      console.log(this.data2);
      console.log(this.state.data3);

      // Send a put request
      let url = "http://EC2Co-EcsEl-O4IIWNOGGYB-671549001.ap-southeast-1.elb.amazonaws.com:8080/user/" + this.state.data.name;
      axios
        .put(url, data2, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        });
    });
  };

  registerHandler = () => {
    this.setState({ redirect: "register" });
  };

  render() {
    if (sessionStorage.getItem("login") !== "true") {
      return <Redirect push to="/login" />;
    } else if (this.state.redirect == "dashboard") {
      return <Redirect push to="/" />;
    } else if (this.state.redirect == "register") {
      return <Redirect push to="/Register" />;
    }

    const options = this.state.usersAll;
    console.log(options);
    return (
      <Card>
        <h1>ตั้งค่าผู้ใช้งาน</h1>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            label="ชื่อผู้ใช้"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue="ชื่อผู้ใช้งาน"
              style={{ width: 200 }}
              onChange={handleChangeName}
            >
              {options.map((option) => (
                <option name={option.userName} key={option.id}>
                  {option.userName}
                </option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="ตำแหน่ง"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue="ตำแหน่ง"
              style={{ width: 200 }}
              onChange={handleChangeRole}
            >
              ระบุชื่อตำแหน่ง
              <Option role="1" key="1">
                ผู้ดูแล
              </Option>
              <Option role="2" key="2">
                อาสาสมัคร
              </Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={() => this.loginHandler}
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              style={{
                margin: "8px",
              }}
              onClick={() => this.registerHandler()}
            >
              เพิ่มผู้ใช้งาน
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Admin2;
