import { useLoaderData } from "react-router-dom";
import { SearchContainer, JobsContainer } from "../components";
import { useMemo } from "react";
import { AllJobsContext } from "../context";

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  const memorizedData = useMemo(()=>{
    return {data, searchValues}
  },[data,searchValues])
  return (
    <AllJobsContext.Provider value={memorizedData}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export default AllJobs;
