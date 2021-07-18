import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData1 = [
  {
    title: "หน้าหลัก",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "เพิ่มเครื่อง",
    path: "/AddMachine",
    icon: <RiIcons.RiHeartAddFill />,
    cName: "nav-text",
  },
  {
    title: "ตั้งค่าผู้ใช้งาน",
    path: "/Admin2",
    icon: <FaIcons.FaUserPlus />,
    cName: "nav-text",
  },
  {
    title: "ออกจากระบบ",
    path: "/Login",
    icon: <RiIcons.RiLoginBoxFill />,
    cName: "nav-text",
  },
];
