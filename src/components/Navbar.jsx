import React, { useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";

// ROUTING

import { Link, Redirect } from "react-router-dom";

// DATA FILE
import { SidebarData1 } from "./SlidebarData";
import { SidebarData2 } from "./SlidebarData2";
// STYLES
import "../css/Navbar.css";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  console.log(sessionStorage.getItem("info"));
  if (sessionStorage.getItem("info") == null ) {
    return <Redirect push to="/login" />;
  }
  let role = JSON.parse(sessionStorage.getItem("info")).type;
  console.log(role);
  if (role == "1") {
    var SidebarData = SidebarData1;
    console.log("this is admin");
  } else if (role == "2") {
    var SidebarData = SidebarData2;
    console.log("this is rescuer");
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
