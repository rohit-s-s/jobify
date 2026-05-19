import React from "react";
import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";

const Stats = () => {
  const { defaultStatus, monthlyApplications } = useLoaderData();
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
