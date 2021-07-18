import React from "react";
import { slide as Menu } from "react-burger-menu";
// import "../css/mydiv.css"

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" href="/Dashboard">
        หน้าหลัก
      </a>

      <a className="menu-item" href="/Give">
        ส่งเครื่องให้ผู้ป่วย
      </a>

      <a className="menu-item" href="/AddMachine">
        เพิ่มเครื่อง
      </a>

      <a className="menu-item" href="/Admin">
        ตั้งค่าผู้ใช้งาน
      </a>

      
    </Menu>
  );
};
