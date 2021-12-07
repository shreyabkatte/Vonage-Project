import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const registerFields = [
  {
    label: "Phone Number",
    type: "number",
  },
];

const onRegisterSubmit = (event, navigate) => {
  event.preventDefault();
  const phoneNumber = event.target.elements[0].value;

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
      if (res.status === "0") {
        console.log("register response is.....", res);
        navigate(`/verify/${phoneNumber}/${res.request_id}`);
      }
    });
};

const Register = () => {
  let navigate = useNavigate();
  return (
    <Form
      fields={registerFields}
      onSubmit={(e) => onRegisterSubmit(e, navigate)}
      buttonLabel={"Register"}
      // linkTo={"/verify"}
      // apiResponse={this.state.registerResponse}
    />
  );
};

export default Register;

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             registerResponse : {},
//         };
//       }

//       onRegisterSubmit =(event) =>{
//         event.preventDefault()
//         const phoneNumber = event.target.elements[0].value;

//         const resisterRequest = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 "number" : phoneNumber,
//                 "brand" : "ICT"
//             })
//         };
//         if(true){
//             useNavigate(`/verify/${1234}`)
//         }

//         fetch('http://localhost:3000/request', resisterRequest)
//         .then(res => res.json())
//         .then(res => {
//             if(res.status==="0"){
//                 this.setState({ registerResponse: res })
//                 useNavigate(`/verify/${res.request_id}`)
//             }
//         });
//     }

//     render() {
//         // console.log("registerResponse=======>" , this.state.registerResponse)
//         return (
//             <Form
//                 fields={registerFields}
//                 onSubmit={this.onRegisterSubmit}
//                 buttonLabel={"Register"}
//                 linkTo={"/verify"}
//                 apiResponse={this.state.registerResponse}
//             />
//         )
//     }
// }

// export default Login
