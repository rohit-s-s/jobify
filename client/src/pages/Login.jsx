import React from "react";
import { Form, Link, useNavigate} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate()

  const loginDemoUser = async () => {
    const data = {
      email:"test@test.com",
      password:"12345678"
    }
    try {
      await customFetch.post("/auth/login",data)
      toast.success("Take a testdrive")
      navigate("/dashboard/all-jobs")
    } catch (error) {
      toast.error(error?.response?.data?.message||"Testdrive unsucessfull")
      console.error(error)
    }
  }

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        {/* Porps are passed down to the Form row component to call the input fields */}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitButton/>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        {/* Re-directing if not a registered user */}
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            {" "}
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
