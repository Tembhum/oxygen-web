import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  DatePicker,
  Radio,
  Layout,
} from "antd";
import SideBar from "../components/sidebar";
import "../css/mydiv.css";
import { Header, Body, Content } from "antd/lib/layout/layout";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);

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

class Give extends React.Component {
  constructor(props) {
    super();
    this.state = {
      redirect: false,
      serial: props.match.params.barcode,
      id: props.match.params.id,
      dataUser: {
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
        location: "",
        severity: 0,
        type: 3,
        caseNo: "",
        servcieRequestDate: null,
        serviceDate: null,
      },

      dataUpdate: {
        deviceId: props.match.params.id,
        status: 2,
        name: null,
        barcode: props.match.params.barcode,
        userId: {},
      },
    };
  }

  onFinish = (values) => {
    let firstname = values.user.name.split(" ")[0];
    let lastname;
    try {
      lastname = values.user.name.split(" ")[1];
    } catch (e) {
      lastname = "";
    }

    try {
      this.setState({
        dataUser: {
          firstName: firstname,
          lastName: lastname,
          age: values.user.age,
          phone: values.user.phone,
          caseNo: values.user.caseNo,
          location: values.user.address,
          // severity: 0,
          type: 3,
          serviceRequestDate: values.dateGive._d,
          serviceDate: values.dateReturn._d,
        },
      });
    } catch {
      console.log("catch")
      this.setState({
        dataUser: {
          firstName: firstname,
          lastName: lastname,
          age: values.user.age,
          phone: values.user.phone,
          caseNo: values.user.caseNo,
          location: values.user.address,
          // severity: 0,
          type: 3,
          serviceRequestDate: values.dateGive._d,
          serviceDate: null,
        },
      });
    }

    axios
      .post(
        process.env.REACT_APP_OXYGEN_APP_URL + "/user",
        this.state.dataUser,
        {
          "content-type": "application/json",
          auth: {
            username: process.env.REACT_APP_TOKEN_USERNAME,
            password: process.env.REACT_APP_TOKEN_PASSWORD,
          },
        }
      )
      .then((res) => {
        this.setState({
          dataUpdate: {
            // deviceId: this.props.match.params.id,
            status: 2,
            name: values.user.phone,
            barcode: this.props.match.params.barcode,
            user: {
              id: res.data.id,
            },
          },
        });

        axios
          .put(
            process.env.REACT_APP_OXYGEN_APP_URL + "/device/" + this.state.id,
            this.state.dataUpdate,
            {
              "content-type": "application/json",
              auth: {
                username: process.env.REACT_APP_TOKEN_USERNAME,
                password: process.env.REACT_APP_TOKEN_PASSWORD,
              },
            }
          )
          .then(() => {
            this.setState({
              redirect: true,
            });
          });
      });
  };

  render() {
    if (sessionStorage.getItem("login") !== "true") {
      return <Redirect push to="/login" />;
    } else if (this.state.redirect == true) {
      return <Redirect push to="/" />;
    }

    return (
      <Card>
        <h1>???????????????</h1>
        <h5>*????????????????????????????????????????????????????????????????????????????????????????????????</h5>
        <h6>??????????????????????????????: {this.state.serial}</h6>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item label="???????????????????????????" name={"dateGive"}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={["user", "caseNo"]}
            label="??????????????????????????????????????????????????? (??????????????????)"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "name"]}
            label="????????????-?????????????????????"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "age"]}
            label="????????????"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={["user", "phone"]} label="????????????????????????">
            <Input />
          </Form.Item>
          <Form.Item name={["user", "address"]} label="?????????????????????">
            <Input.TextArea />
            {/* <button>map</button> */}
          </Form.Item>

          <ColoredLine color="red" />

          <h3>???????????????????????????????????????????????????</h3>

          <Form.Item label="????????????????????????????????????" name={"dateReturn"}>
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="radio-button"
            label="?????????????????????????????????????????????"
            rules={[
              {
                required: true,
                message: "????????????????????????????????????????????????????????????????????????",
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="a">?????????</Radio.Button>
              <Radio.Button value="b">??????????????????</Radio.Button>
              <Radio.Button value="c">???????????????</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      //   </Content>
      // </Layout>
    );
  }
}

export default Give;
