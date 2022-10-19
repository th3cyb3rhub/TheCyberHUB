import React, { useState } from "react";
import styled from "styled-components";
import SideDropdown from "./SideDropdown";
import { Link } from "react-router-dom";
import { NavLinks, SideDropdownIcon } from "../Navbar/NavbarElements";

export default function Dropdown(props) {
  const menu = [
    { title: "Roadmap", url: "/resources/roadmapResources" },
    { title: "Courses", url: "/resources/courses" },
    { title: "Prep", url: "" },
    { title: "Events", url: "/events" },
    { title: "Blogs", url: "/blogs" },
    { title: "News", url: "/resources/cyberNews" },
  ];

  const [sideDrop, setSideDrop] = useState(false);

  const sideDropHandler = (title) => {
    props.sidebar
      ? title === "Prep" && setSideDrop(!sideDrop)
      : title === "Prep"
      ? setSideDrop(true)
      : setSideDrop(false);
  };

  const Item = styled.ul`
    height: 32px;
    position: relative;
    &:hover {
      cursor: pointer;
    }
  `;

  const mobStyle = { width: "100%", padding: 6 };
  const dStyle = {
    borderRadius: 8,
    background: "#101417",
    border: "1px solid #101417",
    width: 130,
    padding: 6,
    color: "white",
    position: "absolute",
    top: 80,
  };

  return (
    <div style={props.sidebar ? mobStyle : dStyle}>
      <li>
        {menu.map((i) =>
          !props.sidebar ? (
            <Item onMouseEnter={() => sideDropHandler(i.title)}>
              <Link style={{ textDecoration: "none", color: "white" }} to={i.url}>
                {" "}
                {i.title}{" "}
              </Link>
              {i.title === "Prep" && sideDrop && <SideDropdown sidebar={false} />}
            </Item>
          ) : (
            <>
              <Item onClick={() => sideDropHandler(i.title)}>
                {i.title !== "Prep" ? (
                  <Link onClick={props.toggle} style={{ textDecoration: "none", color: "white" }} to={i.url}>
                    {" "}
                    {i.title}{" "}
                  </Link>
                ) : (
                  <p style={{ textDecoration: "none", color: "white" }}> {i.title} </p>
                )}
              </Item>
              {i.title === "Prep" && sideDrop && <SideDropdown toggle={props.toggle} sidebar={true} />}
            </>
          ),
        )}
      </li>
    </div>
  );
}
