import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Verify from "./screens/Verify";
import PersonalDetails from "./screens/PersonalDetails";
import SuccessScreen from "./screens/SuccessScreen";

const appStyle = {
  height: "950px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(-45deg, #cc2b5e ,#753a88)",
};

// const Field = React.forwardRef(({label, type}, ref) => {
//     return (
//       <div>
//         <label style={labelStyle} >{label}</label>
//         <input ref={ref} type={type} style={inputStyle} required/>
//       </div>
//     );
// });

// const Form = ({onSubmit}) => {
//     const usernameRef = React.useRef();
//     const passwordRef = React.useRef();
//     const handleSubmit = e => {
//         e.preventDefault();
//         const data = {
//             username: usernameRef.current.value,
//             password: passwordRef.current.value
//         };
//         onSubmit(data);
//     };
//     return (
//         <form style={formStyle} onSubmit={handleSubmit} >
//           <Field ref={usernameRef} label="Phone:" type="number" />
//           <Field ref={passwordRef} label="Password:" type="password" />
//           <div style={{display : 'flex' , alignItems : "center" , justifyContent :"center"}}>
//             <button style={submitStyle} type="submit">Submit</button>
//           </div>
//         </form>

//     );
// };

// Usage example:

const App = () => {
  // const handleSubmit = data => {
  //     const json = JSON.stringify(data, null, 4);
  //     console.clear();
  //     console.log(json);
  // };
  return (
    // <div style={appStyle}>
    //   {/* <Form onSubmit={handleSubmit} /> */}
    //   <Register/>

    // </div>

    <Router>
      <div style={appStyle}>
        {/* <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
          <hr /> */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="verify/:phoneNo/:request_id" element={<Verify />} />
          <Route path="verify" element={<Verify />} />
          <Route path="personal-details" element={<PersonalDetails />} />
          <Route path="success" element={<SuccessScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
