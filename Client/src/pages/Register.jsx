import React from "react";
import { Form, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitButton } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        {/* Code is destructured so that only required input fields are called inside Form row and values are paassed as props */}
        {/* If label is not provided it will be taken from name props */}
        <FormRow type="text" name="name" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
        />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitButton />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            {" "}
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
