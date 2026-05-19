import React from "react";
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../hooks/useDashboardContext";
import links from "../assets/utils/links";
import PropTypes from "prop-types";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const { role } = user;

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (path === "admin" && role !== "admin") return null;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;

NavLinks.propTypes = {
  isBigSidebar: PropTypes.bool,
};
