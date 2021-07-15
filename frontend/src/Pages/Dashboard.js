import { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import SideBar from "../components/sidebar";
import "../css/mydiv.css";
import { Layout } from "antd";
import "../css/dashboard.css";
import "../css/widget.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    devices: [],
    users: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8080/devices").then((dres) => {
      const devices = dres.data.content;
      axios.get("http://localhost:8080/users").then((ures) => {
        const users = ures.data.content;
        this.setState({ devices, users });
      });
    });
  }

  renderTableHeader() {
    let key = this.state.devices;
    let header = key.map((device, index) => {
      let keyArray = Object.keys(device);
      return keyArray.map((header, sindex) => {
        switch (header) {
          case "deviceId":
            return <th key={sindex}> # </th>;
            break;
          case "barcode":
            return <th key={sindex}> หมายเลขเครื่อง </th>;
            break;
          case "name":
            return <th key={sindex}> ผู้ติดต่อ </th>;
            break;
        }
      });
    });
    return header[0]; // will be fix
  }

  giveHandler = async (number, id) => {
    await this.setState({
      destination: "give",
      chosenSerial: number,
      deviceId: id,
    });
  };

  countKey(obj, key, val) {
    let count = 0;
    obj.forEach((a) => {
      if (a[key] == val) {
        return (count += 1);
      }
    });
    return count;
  }

  returnDevice() {}

  renderTableData() {
    return this.state.devices.map((device, index) => {
      const { length, deviceId, barcode, name, status } = device; //destructuring
      return (
        <tr key={deviceId} bgcolor={status == 2 ? "grey" : "white"}>
          <td>
            <font color={status == 4 ? "grey" : "white"}>{deviceId}</font>
          </td>
          <td>
            <font color={status == 4 ? "grey" : "white"}>{name}</font>
          </td>
          <td>
            <font color={status == 4 ? "grey" : "white"}>{barcode}</font>
          </td>
          <td>
            {" "}
            <Button
              variant={status == 2 ? "outline-light" : "outline-error"}
              size="sm"
              //              onClick="returnFunction()"
              disabled={status == 4}
            >
              Return
            </Button>{" "}
          </td>
          <td>
            {" "}
            <Button
              variant={status == 4 ? "outline-success" : "outline-error"}
              size="sm"
              value={barcode}
              onClick={() => {
                this.giveHandler(barcode, deviceId);
              }}
              disabled={status == 2}
            >
              Give
            </Button>{" "}
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log(sessionStorage.getItem("login"));
    if (this.state.destination == "give") {
      return (
        <Redirect
          to={`/give?barcode=${this.state.chosenSerial},id=${this.state.deviceId}`}
        />
      );
    } else if (sessionStorage.getItem("login") !== "true") {
      return <Redirect push to="/login" />;
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="card-box bg-blue">
                <div className="inner">
                  <h3> {this.countKey(this.state.users, "type", "3")} </h3>
                  <p> จำนวนผู้ป่วยที่ได้รับการช่วยเหลือ </p>
                </div>
                <div className="icon">
                  <h1 className="fonticon">Patient</h1>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card-box bg-green">
                <div className="inner">
                  <h3>
                    {" "}
                    {this.countKey(this.state.devices, "status", "4")}/
                    {this.state.devices.length}{" "}
                  </h3>
                  <p> จำนวนเครื่องว่าง/ทั้งหมด </p>
                </div>
                <div className="icon">
                  <h1 className="fonticon">Oxygen</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}></div>
        <table id="machines">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;
