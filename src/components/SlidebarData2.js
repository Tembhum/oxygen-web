import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData2 = [
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
    title: "ออกจากระบบ",
    path: "/Login",
    icon: <RiIcons.RiLoginBoxFill />,
    cName: "nav-text",
  },
];
