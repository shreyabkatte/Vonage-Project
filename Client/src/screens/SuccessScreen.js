import React from "react";
import { TO_NUMBER, FROM_NUMBER } from "../properties";
import { useNavigate } from "react-router-dom";

const formStyle = {
  padding: "30px",
  border: "1px solid #c9c9c9",
  borderRadius: "5px",
  background: "#f5f5f5",
  width: "400px",
  display: "block",
  minHeight: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const labelStyle = {
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "20px",
  backgroundColor: "green",
  borderRadius: "8px",
  padding: "25px",
  marginBottom: "20px",
  color: "white",
};

const onSubmit = (event, navigate) => {
  event.preventDefault();

  const requestBody = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: [
        {
          type: "phone",
          number: TO_NUMBER,
        },
      ],
      from: {
        type: "phone",
        number: FROM_NUMBER,
      },
      answer_url: require(`../components/text-to-speech.json`),
    }),
  };
  fetch("http://localhost:3000/call", requestBody).then((res) => res.json());
  // .then((res) => {
  //   if (res.messages[0]["status"] === "0") {
  //     notify(
  //       "Registration confirmation is sent to your number ending with 1086"
  //     );
  //     // navigate("/success");
  //   }
  // });
};

const Success = () => {
  let navigate = useNavigate();
  return (
    <div style={formStyle}>
      <div>
        <div style={labelStyle}>{"Successfully Registered!"}</div>

        <nav>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span>{"To login "}</span>
            <span>&nbsp;</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
              onClick={(e) => onSubmit(e, navigate)}
            >
              <span>{"Click Here"}</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Success;
