import React from "react";
import { useNavigation } from "react-router-dom";

const SubmitButton = ({formBtn}) => {

   const navigation = useNavigation()
   const isSubmitting = navigation.state==="submitting" 
  return (
    <button
      className={formBtn ? "btn btn-block form-btn": "btn btn-block"}
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
