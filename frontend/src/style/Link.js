import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "styled-components/macro";

const Link = ({ children, ...rest }) => {
  return (
    <NavLink
      activeStyle={{
        color: "white",
        fontWeight: "bold",
        textDecoration: "underline"
      }}
      {...rest}
      css={css`
        text-decoration: none;
        text-shadow: black;
        color: rgb(214, 35, 12);
        text-shadow: black 1px 0 10px;

        :hover {
          text-decoration: underline;
        }
      `}
    >
      {children}
    </NavLink>
  );
};

export default Link;
