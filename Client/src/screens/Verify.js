import React from "react";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FROM_NUMBER } from "../properties";
import Header from "../components/Header";

const fields = [
  {
    label: "Enter your 4 digit code",
    type: "number",
  },
];

const errorToast = (message) =>
  toast.error(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

const successToast = (message) =>
  toast.success(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

const onSubmit = (event, navigate, params) => {
  event.preventDefault();
  // parameters for verify/check API
  const request_id = params && params.request_id;
  const code = event.target.elements[0].value;

  // parameters for SMS API
  const phoneNumber = params && params.phoneNo;
  const name = params && params.name;
  const message = `Dear ${
    name && name === "null" ? "user" : name
  }, you have successfully registered at Optho Clinic!`;

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

        if (name !== "null") {
          const requestBody = {
            method: method,
            headers: headers,
            body: JSON.stringify({
              virtualNumber: FROM_NUMBER,
              toNumber: phoneNumber,
              message: message,
            }),
          };

          fetch("http://localhost:3000/send", requestBody)
            .then((res) => res.json())
            .then((res) => {
              if (res.messages[0]["status"] === "0") {
                successToast("You Phone Number is successfully verified!");
                setTimeout(() => navigate(`/home/${phoneNumber}`), 1000);
              } else {
                errorToast("Something went wrong!");
              }
            })
            .catch((err) => errorToast("Something went wrong!"));
        } else {
          successToast("You Phone Number is successfully verified!");
          setTimeout(() => navigate(`/home/${phoneNumber}`), 2000);
        }

        // Navigate to next page on success
      } else {
        //   Display error message on screen
        errorToast("Incorrect PIN!");
      }
    });
};

const Verify = () => {
  let navigate = useNavigate();
  let params = useParams();

  return (
    <div>
      <Header />
      <Form
        fields={fields}
        onSubmit={(e) => onSubmit(e, navigate, params)}
        buttonLabel={"Verify Me!"}
        page={"verify"}
      />
      <ToastContainer style={{ width: "30%" }} />
    </div>
  );
};

export default Verify;
