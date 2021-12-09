import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";

const errorToast = (message) =>
  toast.error(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

/**
 * @name Shreya
 * @description This function is called on Register button click. It makes a request to Vonage verify/request API.
 * @param {object} event
 * @param {object} navigate
 */

const onRegisterSubmit = (event, navigate) => {
  event.preventDefault();
  const phoneNumber = event.target.elements[0].value;
  const id = "ahhah";

  const resisterRequest = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      number: phoneNumber,
      brand: "ICT",
    }),
  };

  fetch("http://localhost:3000/request", resisterRequest)
    .then((res) => res.json())
    .then((res) => {
      console.log("register response is.....", res);
      if (res.status === "0") {
        setTimeout(
          () => navigate(`/verify/${phoneNumber}/${res.request_id}/${null}`),
          1000
        );
      } else {
        errorToast("Something went wrong!");
      }
    })
    .catch((err) => errorToast("Something went wrong!"));
};

/**
 * @name Shreya
 * @description Main Register component used to display the Form.
 */

const Register = () => {
  let navigate = useNavigate();
  const registerFields = [
    {
      label: "Phone Number",
      type: "number",
    },
  ];
  return (
    <div>
      <ToastContainer style={{ width: "30%" }} />
      <Header />

      <Form
        fields={registerFields}
        onSubmit={(e) => onRegisterSubmit(e, navigate)}
        buttonLabel={"Register"}
      />
    </div>
  );
};

export default Register;
