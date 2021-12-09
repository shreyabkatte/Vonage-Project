import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fields = [
  {
    label: "Full Name",
    type: "text",
  },
  {
    label: "Phone Number",
    type: "number",
    // name: "Phone",
  },
  {
    label: "Address",
    type: "text",
  },
  {
    label: "Password",
    type: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
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

const onSubmit = (event, navigate) => {
  event.preventDefault();
  const name = event.target.elements[0].value;
  const phoneNumber = event.target.elements[1].value;
  const address = event.target.elements[2].value;
  const password = event.target.elements[3].value;
  const confirmedPassword = event.target.elements[4].value;

  if (password === confirmedPassword) {
    console.log("=====inside");
    const resisterRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: phoneNumber,
        brand: "ICT",
      }),
    };

    // navigate(`/verify/${phoneNumber}`);

    fetch("http://localhost:3000/request", resisterRequest)
      .then((res) => res.json())
      .then((res) => {
        console.log("register response is.....", res);
        if (res.status === "0") {
          setTimeout(
            () => navigate(`/verify/${phoneNumber}/${res.request_id}/${name}`),
            1000
          );
        } else {
          errorToast("Something went wrong!");
        }
      })
      .catch((err) => errorToast("Something went wrong!"));
  } else {
    errorToast("Please enter the right password!");
  }

  // navigate(`/verify/${phoneNumber}`);

  // if (password === confirmedPassword) {
  //   fetch("http://localhost:3000/send", requestBody)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.messages[0]["status"] === "0") {
  //         successToast(
  //           "Registration confirmation is sent to your number ending with 1086"
  //         );
  //         setTimeout(() => navigate(`/verify/${phoneNumber}`), 2000);
  //         navigate("/login");
  //       }
  //     });
  //   if (true) {
  //     successToast(
  //       "Registration confirmation is sent to your number ending with 1086"
  //     );
  //     setTimeout(() => navigate("/success"), 2000);
  //   }
  // } else {
  //   errorToast("Please enter the right password!");
  // }
};

const PersonalDetails = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Form
        fields={fields}
        onSubmit={(e) => onSubmit(e, navigate)}
        buttonLabel={"Submit"}
        // linkTo="/login"
      />
      <ToastContainer style={{ width: "30%" }} />
    </div>
  );
};

export default PersonalDetails;
