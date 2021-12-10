import React from "react";
import Form from "../components/Form";
import { FROM_NUMBER } from "../properties";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";

// Form fields for Login page
const fields = [
  {
    label: "Phone Number",
    type: "number",
  },
  {
    label: "Password",
    type: "password",
  },
];

/**
 * @name Login Component
 * @description The components renders all the sub components in Login page
 * @author Shreya BALACHANDRA
 */
const Login = () => {
  let navigate = useNavigate();

  // Error Toast
  const errorToast = (message) =>
    toast.error(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const successToast = (message) =>
    toast.success(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  /**
   * @name onSubmit
   * @description This function allows the user to login. Calls SMS Api to send successfull login message to the user
   * @param {object} event
   * @param {object} navigate
   * @author Shreya BALACHANDRA
   */
  const onSubmit = (event, navigate) => {
    event.preventDefault();
    const phoneNumber = event.target.elements[0].value;
    const message =
      "Dear user, you have successfully logged in to your Optho Clinic account!";

    // SMS Api start
    const requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        virtualNumber: FROM_NUMBER,
        toNumber: phoneNumber,
        message: message,
      }),
    };

    fetch("http://localhost:3000/send", requestBody)
      .then((res) => res.json())
      .then((res) => {
        successToast("Logged in successfully!");
        setTimeout(() => navigate(`/home/${phoneNumber}`), 1000);
      })
      .catch((err) =>
        errorToast("Something went wrong while sending message!")
      );
    // SMS Api end
  };

  /**
   * @description Main Login component used to display the Form.
   * @author Shreya BALACHANDRA
   */
  return (
    <div>
      <ToastContainer style={{ width: "30%" }} />
      <Header />
      <Form
        fields={fields}
        onSubmit={(e) => onSubmit(e, navigate)}
        buttonLabel={"Login"}
        // linkTo="abc"
        page={"login"}
      />
    </div>
  );
};

export default Login;
