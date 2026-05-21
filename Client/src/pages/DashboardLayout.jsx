import React from "react";
import { Outlet, useNavigation} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import { DashboardProvider } from "../provider/DashboardProvider";

const DashboardLayout = () => {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === "loading"

  return (
    <DashboardProvider>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading?<Loading/>:<Outlet/>}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};
export default DashboardLayout;
