import React from "react";
import Form from "../components/Form";
import { FROM_NUMBER } from "../properties";

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

class Login extends React.Component {
  onSubmit = (event) => {
    event.preventDefault();
    console.log("=======>", event.target.elements[0].value);
    const phoneNumber = event.target.elements[0].value;
    // const password = event.target.elements[1].value;
    const message = "This is a sample message of login";

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
      .then((res) => this.setState({ apiResponse: res }));
  };

  render() {
    return (
      <Form
        fields={fields}
        onSubmit={this.onSubmit}
        buttonLabel={"Login"}
        linkTo="abc"
      />
    );
  }
}

export default Login;
