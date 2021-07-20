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
import Moment from "moment";

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

class Info extends React.Component {
  state = { redirect: false, deviceId: "", device: {}, user: {} };

  constructor(props) {
    super(props);
    console.log(props.match.params.id);
    this.state = {
      redirect: false,
      deviceId: props.match.params.id,
      device: {},
      user: {},
    };

    axios
      .get(
        process.env.REACT_APP_OXYGEN_APP_URL + "/device/" + this.state.deviceId,
        {
          auth: {
            username: process.env.REACT_APP_TOKEN_USERNAME,
            password: process.env.REACT_APP_TOKEN_PASSWORD,
          },
        }
      )
      .then((dres) => {
        const device = dres.data.content;
        this.setState({
          device: dres.data,
          user: dres.data.user,
        });
      });
  }

  backHandler = () => {
    this.setState({ redirect: true });
  };

  render() {
    console.log(this.state.redirect);
    if (sessionStorage.getItem("login") !== "true") {
      return <Redirect push to="/login" />;
    } else if (this.state.redirect == true) {
      return <Redirect push to="/" />;
    }
    return (
      <Card>
        <h1>ข้อมูลเครื่องผลิตออกซิเจน</h1>
        <h6>หมายเลขเครื่อง: {this.state.device.barcode}</h6>
        <h6>เบอร์ติดต่อ: {this.state.device.name}</h6>
        <h6>
          ชื่อผู้ติดต่อ:
          {this.state.user.firstName}
        </h6>
        <h6>
          นามสกุลผู้ติดต่อ:
          {this.state.user.lastName}
        </h6>
        <h6>ที่อยู่: {this.state.user.location}</h6>
        <h6>
          วันที่ขอยืมเครื่อง:{" "}
          {Moment(this.state.user.serviceRequestDate).format("YYYY-MM-DD")}
        </h6>
        <h6>
          วันที่คืนเครื่อง:{" "}
          {Moment(this.state.user.serviceDate).format("YYYY-MM-DD")}
        </h6>
        <div>
          <button onClick={this.backHandler}>Go Back</button>
        </div>
      </Card>
    );
  }
}

export default Info;
