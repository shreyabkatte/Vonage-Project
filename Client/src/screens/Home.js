import React, { useState } from "react";
import { TO_NUMBER, FROM_NUMBER } from "../properties";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Doctor_avatar from "../img/Doctor.jpeg";
import female from "../img/female-avatar.jpg";
import male from "../img/male-avatar.jpg";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import Success from "./SuccessScreen";

const formStyle = {
  padding: "30px",
  border: "1px solid #c9c9c9",
  borderRadius: "5px",
  background: "#f5f5f5",
  width: "600px",
  display: "block",
  minHeight: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const submitStyle = {
  margin: "20px 0 0 0",
  padding: "7px 10px",
  borderRadius: "8px",
  background: "linear-gradient(-45deg, #3db3c5, #274685)",
  width: "20%",
  minWidth: "150px",
  fontSize: "20px",
  color: "white",
  display: "block",
  height: "50px",
  cursor: "pointer",
};

const bookStyle = {
  margin: "20px 0 0 0",
  padding: "7px 10px",
  borderRadius: "8px",
  backgroundColor: "green",
  width: "20%",
  minWidth: "150px",
  fontSize: "20px",
  color: "white",
  display: "block",
  height: "50px",
  cursor: "pointer",
  borderColor: "transparent",
};

const confirmStyle = {
  margin: "20px 0 0 0",
  padding: "7px 10px",
  borderRadius: "8px",
  background: "linear-gradient(-45deg, #3db3c5, #274685)",
  width: "20%",
  minWidth: "150px",
  fontSize: "20px",
  color: "white",
  display: "block",
  height: "50px",
  cursor: "pointer",
  borderColor: "transparent",
  alignSelf: "start",
};

const fontStyle = {
  background: "linear-gradient(-45deg, #3db3c5, #274685)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
};

const labelStyle = {
  // margin: '10px 0 5px 0',
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "20px",
};

const inputStyle = {
  margin: "15px 0px 30px 0px",
  padding: "5px",
  border: "1px solid #bfbfbf",
  borderRadius: "8px",
  boxSizing: "border-box",
  width: "50%",
  height: "50px",
  fontSize: "18px",
};

const doctors = [
  {
    name: "Dr. Alexander Smith",
    phone: "83738894948",
    slots: ["9:30 AM", "10:30 AM", "2:00 PM"],
    specialization: "Surgeon",
    avatar: male,
  },
  {
    name: "Dr. Rina Paul",
    phone: "98764672727",
    slots: ["9:30 AM", "10:30 AM", "2:00 PM"],
    specialization: "Retina Specialist",
    avatar: female,
  },
  {
    name: "Dr. Karthik Cheral House",
    phone: "9686987977",
    slots: ["9:30 AM", "10:30 AM", "2:00 PM"],
    specialization: "General Consultation",
    avatar: male,
  },
];

// const onCallClick = (event, navigate) => {
//   event.preventDefault();

//   const requestBody = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       to: [
//         {
//           type: "phone",
//           number: TO_NUMBER,
//         },
//       ],
//       from: {
//         type: "phone",
//         number: FROM_NUMBER,
//       },
//       ncco: [
//         {
//           action: "talk",
//           text: "Safely handling environment variables makes coding even more fun.",
//         },
//       ],
//     }),
//   };
//   fetch("http://localhost:3000/call", requestBody).then((res) => res.json());
// };

// const onBookClick = (event, navigate) => {
//   event.preventDefault();

//   const requestBody = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       virtualNumber: FROM_NUMBER,
//       toNumber: "33664061086",
//       message: "ABC",
//     }),
//   };

//   fetch("http://localhost:3000/send", requestBody).then((res) => res.json());
// };

const Home = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [selectedObject, setSelectedObject] = useState({});
  const [slot, setSlot] = useState({});
  const [submit, setSubmit] = useState(false);
  const [username, setUsername] = useState("");

  const openDialog = (e, index) => {
    setDialog(true);
    setSelectedObject(doctors[index]);
  };

  const onSlotClick = (e, index) => {
    console.log("=====>", index);
    setSlot({ [index]: !slot[index], name: true, slotIndex: index });
  };

  const errorToast = (message) =>
    toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const onFormSubmit = (event, params, doctor, slotIndex) => {
    const name = event.target.elements[0].value;
    const phoneNumber = params && params.phoneNo;
    event.preventDefault();
    const message = `Dear ${name}, your appointment has been booked with ${doctor["name"]} at ${doctor["slots"][slotIndex]} for tomorrow`;

    /* SMS API Start*/
    const messageRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        virtualNumber: FROM_NUMBER,
        toNumber: phoneNumber,
        message: message,
      }),
    };

    fetch("http://localhost:3000/send", messageRequest)
      .then((res) => res.json())
      .catch((err) =>
        errorToast("Something went wrong while sending message!")
      );

    /* SMS API end*/

    const callRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: [
          {
            type: "phone",
            number: phoneNumber,
          },
        ],
        from: {
          type: "phone",
          number: FROM_NUMBER,
        },
        ncco: [
          {
            action: "talk",
            text: message,
          },
        ],
      }),
    };
    fetch("http://localhost:3000/call", callRequest)
      .then((res) => res.json())
      .then((res) => {
        console.log("call response.....", res);
      })
      .catch((error) => errorToast("Something went wrong in call!"));

    setSubmit(true);
    setUsername(name);
    setDialog(false);
  };

  return (
    <div>
      <ToastContainer style={{ width: "30%" }} />
      <Header style={{ width: submit ? "400px" : "600px" }} />

      {submit ? (
        <Success
          selectedObject={selectedObject}
          slot={slot}
          username={username}
        />
      ) : (
        <div style={formStyle}>
          <div>
            {/* <div style={labelStyle}>{"Successfully Registered!"}</div> */}

            {doctors.map((item, index) => {
              return (
                <div style={{ display: "flex", marginBottom: "30px" }}>
                  <img
                    src={item.avatar}
                    width="30%"
                    style={{ marginRight: "20px", borderRadius: "50%" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ marginBottom: "10px" }}>{item.name}</span>
                    <span style={{ marginBottom: "10px", ...fontStyle }}>
                      {item.specialization}
                    </span>
                    <span>{item.phone}</span>
                    <div style={{ display: "flex" }}>
                      <div
                        onClick={(e) => openDialog(e, index)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                          marginRight: "20px",
                        }}
                      >
                        <button type="submit" style={submitStyle}>
                          {"Book online"}
                        </button>
                      </div>
                      <div
                        // onClick={(e) => (e, index)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                        }}
                      >
                        <button type="submit" style={submitStyle}>
                          {"Call"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div style={{ display: "flex" }}>
        <img src={Doctor_avatar} width="30%" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Dr. Rina Paul</span>
          <span>98764672727</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            <button type="submit" style={submitStyle}>
              {"Book Now"}
            </button>
          </div>
        </div>
      </div> */}
          </div>
          <Dialog
            onClose={() => {
              setDialog(false);
              setSlot({});
            }}
            open={dialog}
          >
            <DialogTitle style={fontStyle}>
              {`Booking appointment with ${selectedObject.name}`}
            </DialogTitle>
            <div
              style={{
                alignSelf: "center",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              Available Slots for tomorrow
            </div>
            <div style={{ display: "flex", alignSelf: "center" }}>
              {selectedObject["slots"] &&
                selectedObject["slots"].map((item, index) => {
                  return (
                    <div
                      onClick={(e) => onSlotClick(e, index)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        marginRight: "20px",
                      }}
                    >
                      <button
                        type="submit"
                        style={
                          slot[index]
                            ? { ...bookStyle, backgroundColor: "red" }
                            : bookStyle
                        }
                      >
                        {item}
                      </button>
                    </div>
                  );
                })}
            </div>
            {slot["name"] && (
              <form
                style={{ marginLeft: "30px", marginTop: "20px" }}
                onSubmit={(e) =>
                  onFormSubmit(e, params, selectedObject, slot["slotIndex"])
                }
              >
                <input
                  type={"text"}
                  placeholder={"Enter your name"}
                  style={inputStyle}
                  required
                />
                <div>
                  <button type="submit" style={confirmStyle}>
                    {"Confirm"}
                  </button>
                </div>
              </form>
            )}
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Home;
