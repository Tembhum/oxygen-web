import React from "react";
import ReactDOM from "react-dom";
import { Redirect,Link } from "react-router-dom";
import "../css/style.css";
import SideBar from "../components/sidebar";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../components/history";

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      destination: "",
    };
  }

  receiveHandler = () => {
    this.setState({ destination: "return" });
  };

  giveHandler = () => {
    this.setState({ destination: "give" });
  };

  render() {
    console.log(this.state)
    if (this.state.destination == "return") {
      return <Redirect push to="/return" />;
    } else if (this.state.destination == "give") {
      return <Redirect push to="/give" />;
    }
    return (
      <div id="App">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

        <div id="page-wrap">
          <h1>ระบบบริหารจัดการถังออกซิเจน</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <ButtonGroup vertical align="center">
            <Button
              variant="outline-primary"
              size="lg"
              block
              onClick={() => {
                this.giveHandler();
              }}
            >
              ส่งถังออกซิเจนให้ผู้ป่วย
            </Button>
            {/* <Button variant="outline-primary" size="lg" block  onClick={() => history.push('/return')}> */}
            <Button
              variant="outline-primary"
              size="lg"
              block
              onClick={() => {
                this.receiveHandler();
              }}
            >
              รับถังออกซิเจนคืน
            </Button>
            <Button variant="outline-primary" size="lg" block>
              กราฟ
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default Landing;
