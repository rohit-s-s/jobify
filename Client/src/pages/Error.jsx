import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";


const ErrorPage = () => {
  const error = useRouteError();
  // Logging error in console
  console.log(error);

  //for 404 errors the page will throw the following error
  if (error.status === 404) {
    return(
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Page not found</h3>
          <p>The page you are looking doesnot exist. Navigate to the home page by clicking the below button</p>
          <Link to='/'>Back Home</Link>
        </div>
      </Wrapper>
    )
  }

  //Error output for non-404 errors
  return (
    <Wrapper>
      <p>Something went wrong <Link to="/"> Back Home</Link></p>
    </Wrapper>
  );
};

export default ErrorPage;
