import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FROM_NUMBER } from "../properties";

const fields = [
  {
    label: "Full Name",
    type: "text",
  },
  {
    label: "Email Id",
    type: "text",
  },
  {
    label: "Phone Number",
    type: "number",
    name: "Phone",
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
  const emailId = event.target.elements[1].value;
  const phoneNumber = event.target.elements[2].value;
  const address = event.target.elements[3].value;
  const password = event.target.elements[4].value;
  const confirmedPassword = event.target.elements[5].value;

  // const password = event.target.elements[1].value;
  //   const message = `Hello ${name}, Your number ${phoneNumber} have been successfully registered!`;
  const message = `Registered!`;

  const requestBody = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      virtualNumber: FROM_NUMBER,
      toNumber: phoneNumber,
      message: message,
    }),
  };

  if (password === confirmedPassword) {
    // fetch("http://localhost:3000/send", requestBody)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.messages[0]["status"] === "0") {
    //       notify(
    //         "Registration confirmation is sent to your number ending with 1086"
    //       );
    //       navigate("/success");
    //     }
    //   });
    if (true) {
      successToast(
        "Registration confirmation is sent to your number ending with 1086"
      );
      setTimeout(() => navigate("/success"), 2000);
    }
  } else {
    errorToast("Please enter the right password!");
  }
};

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

// class Login extends React.Component {
//   onSubmit = (event) => {
//     event.preventDefault();
//     console.log("=======>", event.target.elements[0].value);
//     const name = event.target.elements[0].value;
//     const emailId = event.target.elements[1].value;
//     const phoneNumber = event.target.elements[2].value;
//     const address = event.target.elements[3].value;
//     const password = event.target.elements[4].value;
//     const confirmedPassword = event.target.elements[5].value;

//     // const password = event.target.elements[1].value;
//     const message = `Hello ${name}, Your number ${phoneNumber} have been successfully registered!`;

//     const requestBody = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         virtualNumber: "33644633627",
//         toNumber: phoneNumber,
//         message: message,
//       }),
//     };
//     console.log("outside confirm");
//     if (password === confirmedPassword) {
//       console.log("inside confirm");
//       fetch("http://localhost:3000/send", requestBody)
//         .then((res) => res.json())
//         .then((res) => {
//           if (res.messages[0]["status"] === "0") {
//             notify();
//           }
//         });
//     }
//   };

//   render() {
//     return (
//       <div>
//         <Form
//           fields={fields}
//           onSubmit={this.onSubmit}
//           buttonLabel={"Register"}
//           //   linkTo={"/success"}
//         />
//         <ToastContainer />
//       </div>
//     );
//   }
// }
