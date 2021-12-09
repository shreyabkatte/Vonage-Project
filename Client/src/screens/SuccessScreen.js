import React from "react";
import { TO_NUMBER, FROM_NUMBER } from "../properties";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { radioClasses } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const formStyle = {
  padding: "30px",
  border: "1px solid #c9c9c9",
  borderRadius: "5px",
  background: "#f5f5f5",
  width: "400px",

  minHeight: "300px",
};

const labelStyle = {
  fontSize: "20px",
  color: "white",
  marginLeft: "10px",
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
      ncco: [
        {
          action: "talk",
          text: "Safely handling environment variables makes coding even more fun.",
        },
      ],
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

const Success = ({ selectedObject, slot, username }) => {
  let navigate = useNavigate();
  let slotIndex = slot && slot["slotIndex"];
  let time = selectedObject && selectedObject["slots"][slotIndex];
  let name = selectedObject && selectedObject["name"];

  console.log("slot is....", slot);
  console.log("slot object is....", selectedObject);

  return (
    <div style={formStyle}>
      <div>
        <div
          style={{
            fontSize: "30px",
            background: "linear-gradient(-45deg, #3db3c5, #274685)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            marginBottom: "20px",
          }}
        >
          Appointment confimed
        </div>
        <div
          style={{
            background: "linear-gradient(-45deg, #3db3c5, #274685)",
            padding: "30px",
            borderRadius: 4,
          }}
        >
          <div style={{ flexDirection: "row", marginBottom: "20px" }}>
            <div
              style={{ display: "flex", width: "50%", marginBottom: "20px" }}
            >
              <DateRangeIcon />
              <span style={labelStyle}>Tomorrow</span>
            </div>
            <div style={{ display: "flex", width: "50%" }}>
              <AccessTimeIcon />
              <span style={labelStyle}>{time}</span>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <LocalHospitalIcon />
            <span style={labelStyle}>{name}</span>
          </div>

          <div style={{ display: "flex" }}>
            <PersonIcon />
            <span style={labelStyle}>{username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
