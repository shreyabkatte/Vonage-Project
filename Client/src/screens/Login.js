import React from "react";
import Form from "../components/Form";
import { FROM_NUMBER } from "../properties";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";

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

const Login = () => {
  let navigate = useNavigate();

  const errorToast = (message) =>
    toast.error(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const onSubmit = (event, navigate) => {
    event.preventDefault();
    const phoneNumber = event.target.elements[0].value;
    const message = "Login Success!";
    // "Dear user, you have successfully logged in to your Optho Clinic account!";

    const requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        virtualNumber: FROM_NUMBER,
        toNumber: phoneNumber,
        message: message,
      }),
    };

    // navigate(`/home/${phoneNumber}`);

    fetch("http://localhost:3000/send", requestBody)
      .then((res) => res.json())
      .then(setTimeout(() => navigate(`/home/${phoneNumber}`), 1000))
      .catch((err) =>
        errorToast("Something went wrong while sending message!")
      );
  };

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
