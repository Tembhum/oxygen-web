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
    devices: []
  }

  componentDidMount() {
    axios.get('http://localhost:8080/devices')
      .then(res => {
        const devices = res.data.content;
        this.setState({ devices });
      })
  }

  constructor(props) {
    super(props);
    axios.get('http://localhost:8080/devices')
      .then(res => {
        const devices = res.data.content;
        this.state = devices;
      })
  }

  renderTableHeader() {
    let key = this.state.devices;
    let header = key.map((device, index) => {
        let keyArray = Object.keys(device);
        return keyArray.map((header, sindex) =>
        {   console.log(header);
            switch (header ){
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

  giveHandler = () => {
    this.setState({ destination: "give" });
  };

  renderTableData() {
    return this.state.devices.map((device, index) => {
      const { length, deviceId, barcode, name, status } = device ; //destructuring
      return (
        <tr key={deviceId} bgcolor={!status ? "grey" : "white"}>
          <td>
            <font color={status ? "grey" : "white"}>{deviceId}</font>
          </td>
          <td>
            <font color={status ? "grey" : "white"}>{name}</font>
          </td>
          <td>
            <font color={status ? "grey" : "white"}>{name}</font>
          </td>
          <td>
            {" "}
            <Button
              variant={!status ? "outline-light" : "outline-error"}
              size="sm"
//              onClick="returnFunction()"
              disabled={status}
            >
              Return
            </Button>{" "}
          </td>
          <td>
            {" "}
            <Button
              variant={status ? "outline-success" : "outline-error"}
              size="sm"
              onClick={() => {
                this.giveHandler();
              }}
              disabled={!status}
            >
              Give
            </Button>{" "}
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.state.destination == "give") {
      return <Redirect push to="/give" />;
    }

    return (
      <Layout>
        <Header className="background">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        </Header>

        <Content className="background">
          <br></br>
          <div>
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <div className="card-box bg-blue">
                    <div className="inner">
                      <h3> 13436 </h3>
                      <p> Patient Summary </p>
                    </div>
                    <div className="icon">
                      <h1 className="fonticon">Patient</h1>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="card-box bg-green">
                    <div className="inner">
                      <h3> 10/{this.state.devices.length} </h3>
                      <p> Available/Total </p>
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
        </Content>
      </Layout>
    );
  }
}

export default Dashboard;
