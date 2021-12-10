import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Form fields for personal details
const fields = [
  {
    label: "Full Name",
    type: "text",
  },
  {
    label: "Phone Number",
    type: "number",
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

// Error Toast Message
const errorToast = (message) =>
  toast.error(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

/**
 * @name onSubmit
 * @description Registration of the user using phone number and other personal details.Calls Verify/request API to request for a 4 digit pin to registered Phone number
 * @param {object} event
 * @param {object} navigate
 * @author Shreya BALACHANDRA
 */
const onSubmit = (event, navigate) => {
  event.preventDefault();
  const name = event.target.elements[0].value;
  const phoneNumber = event.target.elements[1].value;
  const password = event.target.elements[3].value;
  const confirmedPassword = event.target.elements[4].value;

  // Check for password equal
  if (password === confirmedPassword) {
    const resisterRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: phoneNumber,
        brand: "Optho Clinic",
      }),
    };

    // Request for a PIN
    fetch("http://localhost:3000/request", resisterRequest)
      .then((res) => res.json())
      .then((res) => {
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
};

/**
 * @name PersonalDetails Component
 * @description The components renders all the sub components in PersonalDetails page
 * @author Shreya BALACHANDRA
 */
const PersonalDetails = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Form
        fields={fields}
        onSubmit={(e) => onSubmit(e, navigate)}
        buttonLabel={"Submit"}
      />
      <ToastContainer style={{ width: "30%" }} />
    </div>
  );
};

export default PersonalDetails;
