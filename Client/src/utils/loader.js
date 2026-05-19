import { toast } from "react-toastify";
import customFetch from "./customFetch";
import { redirect } from "react-router-dom";

export const editJobLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return { data };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const allJobsLoader = async ({request}) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  try {
    const { data } = await customFetch.get("/jobs",{
      params,
    });
    return { data, searchValues: {...params} };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.error(error);
    return error;
  }
};

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/");
  }
};

export const adminLoader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats")
    return response.data
  } catch (error) {
    toast.error("You are not an authorized to access this page")
    console.error(error)
    return redirect("/dashboard/all-jobs")
  }
}

export const statsLoader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats")
    return response.data
  } catch (error) {
   console.error(error)
   return error
  }
}