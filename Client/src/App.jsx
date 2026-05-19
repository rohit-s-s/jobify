import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Landing,
  Login,
  Error,
  DashboardLayout,
  AddJobs,
  Stats,
  Profile,
  AllJobs,
  Admin,
  EditJob,
} from "./pages";
import checkDefaultTheme from "./utils/checkDefaultTheme";

import { allJobsLoader, editJobLoader, dashboardLoader, adminLoader, statsLoader } from "./utils/loader";

import {
  addJobAction,
  editJobAction,
  loginAction,
  profileAction,
  registerAction,
} from "./utils/action";
import { action as deleteJobAction } from "./pages/DeleteJob";

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJobs />,
            action: addJobAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },

          {
            path: "stats",
            element: <Stats />,
            loader:statsLoader
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader:adminLoader
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
