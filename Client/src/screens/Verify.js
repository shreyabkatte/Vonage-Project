import React from "react";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FROM_NUMBER } from "../properties";

const fields = [
  {
    label: "Enter your 4 digit code",
    type: "number",
  },
];

const onSubmit = (event, navigate, params, notify) => {
  event.preventDefault();
  // parameters for verify/check API
  const request_id = params && params.request_id;
  const code = event.target.elements[0].value;

  // parameters for SMS API
  const phoneNumber = params && params.phoneNo;
  const message = "Account succesfully verified!";

  let method = "POST";
  let headers = { "Content-Type": "application/json" };

  const verifyRequest = {
    method: method,
    headers: headers,
    body: JSON.stringify({
      request_id: request_id,
      code: code,
    }),
  };

  fetch("http://localhost:3000/check", verifyRequest)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "0") {
        console.log("verify response is.....", res);
        // Send Successfull Message to the user
        const requestBody = {
          method: method,
          headers: headers,
          body: JSON.stringify({
            virtualNumber: FROM_NUMBER,
            toNumber: phoneNumber,
            message: message,
          }),
        };

        fetch("http://localhost:3000/send", requestBody).then((res) =>
          res.json()
        );
        // Navigate to next page on success
        navigate("/personal-details");
      } else {
        //   Display error message on screen
        notify();
      }
    });
};

const Verify = () => {
  let navigate = useNavigate();
  let params = useParams();
  const notify = () =>
    toast.error("Incorrect PIN!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  return (
    <div>
      <Form
        fields={fields}
        onSubmit={(e) => onSubmit(e, navigate, params, notify)}
        buttonLabel={"Verify Me!"}
      />
      <ToastContainer />
    </div>
  );
};

export default Verify;
