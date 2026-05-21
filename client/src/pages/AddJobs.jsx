import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form } from "react-router-dom";
import { FormRow, SubmitButton } from "../components";
import FormRowSelect from "../components/FormRowSelect";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

const AddJobs = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" labelText="Position" />
          <FormRow type="text" name="company" labelText="Company" />
          <FormRow type="text" name="jobLocation" labelText="Job Location" />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={JOB_STATUS.PENDING}
            values={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={JOB_TYPE.FULL_TIME}
            values={Object.values(JOB_TYPE)}
          />
          <SubmitButton formBtn/>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJobs;
