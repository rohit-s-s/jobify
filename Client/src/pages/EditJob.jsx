import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useLoaderData} from "react-router-dom";
import { FormRow, SubmitButton } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

import FormRowSelect from "../components/FormRowSelect";

export const EditJob = () => {
  const { data } = useLoaderData();
  const JOB = data.job;

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            labelText="Position"
            defaultValue={JOB.position}
          />
          <FormRow
            type="text"
            name="company"
            labelText="Company"
            defaultValue={JOB.company}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={JOB.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={JOB.jobStatus}
            values={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={JOB.jobType}
            values={Object.values(JOB_TYPE)}
          />
          <SubmitButton formBtn/>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
