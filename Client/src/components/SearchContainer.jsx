import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from ".";
import { Form, Link, useSubmit } from "react-router-dom";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { useAllJobsContext } from "../hooks/useAllJobsContext";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobType, jobStatus, sort } = searchValues;
 
  const submit = useSubmit();

  //adding a time delay for the search
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form method="get" className="form" key={JSON.stringify(searchValues)}>
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type={"search"}
            name={"search"}
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText={"job status"}
            name={"jobStatus"}
            values={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText={"job type"}
            name={"jobType"}
            defaultValue={jobType}
            values={["all", ...Object.values(JOB_TYPE)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name={"sort"}
            defaultValue={sort}
            values={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link
            to={"/dashboard/all-jobs"}
            className="btn form-btn delete-btn"
            replace
          >
            Reset Search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
