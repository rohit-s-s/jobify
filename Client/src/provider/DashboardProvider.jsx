import React, { useCallback, useMemo, useState } from "react";
import checkDefaultTheme from "../utils/checkDefaultTheme";
import { DashboardContext } from "../context";
import PropTypes from "prop-types";
import { useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";



export const DashboardProvider = ({ children }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = useCallback(() => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  }, [isDarkTheme]);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  const logoutUser = useCallback(async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("User logout");
  }, [navigate]);
  const value = useMemo(
    () => ({
      user,
      showSidebar,
      isDarkTheme,
      toggleDarkTheme,
      toggleSidebar,
      logoutUser,
    }),
    [user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser]
  );
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.any,
};
