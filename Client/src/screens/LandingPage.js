import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

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

const submitStyle = {
  margin: "20px 0 0 0",
  padding: "7px 10px",
  borderRadius: "8px",
  background: "linear-gradient(-45deg, #3db3c5, #274685)",
  // width: "40%",
  minWidth: "150px",
  fontSize: "20px",
  color: "white",
  display: "block",
  height: "50px",
  cursor: "pointer",
};

/**
 * @description Main Success component used to display the Landing page.
 * @author Shreya BALACHANDRA
 */

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div>
        <div
          style={{
            color: "white",
            fontSize: "30px",
            background: "linear-gradient(-45deg, #3db3c5, #274685)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            display: "flex",
            justifyContent: "center",
          }}
        >
          To book an appointment
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Guest Button */}

          <Link
            to="/register"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            <button type="submit" style={submitStyle}>
              {"Guest User"}
            </button>
          </Link>
          {/* Register Button */}
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <button type="submit" style={submitStyle}>
              {"Login"}
            </button>
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default LandingPage;
