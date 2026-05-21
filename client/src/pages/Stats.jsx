import React from "react";
//import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";

const Stats = () => {
 // const { defaultStatus, monthlyApplications } = useLoaderData();

  const {isLoading,isError,data} = useQuery({
    queryKey:['stats'],
    queryFn:()=>customFetch.get("/jobs/stats")
  })
  if(isLoading) return <h4>Loading...</h4>
  if(isError) return <h4>Error...</h4>
  const { defaultStatus, monthlyApplications } = data.data
  return (
    <>
      <StatsContainer defaultStatus={defaultStatus} />

      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
