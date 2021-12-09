import React from "react";
import { Link } from "react-router-dom";
import { FROM_NUMBER } from "../properties";

const formStyle = {
  // margin: 'auto',
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
  // margin: '10px 0 5px 0',
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "20px",
};

const inputStyle = {
  margin: "15px 0px 30px 0",
  padding: "5px",
  border: "1px solid #bfbfbf",
  borderRadius: "8px",
  boxSizing: "border-box",
  width: "100%",
  height: "50px",
  fontSize: "18px",
};

const submitStyle = {
  margin: "20px 0 0 0",
  padding: "7px 10px",
  borderRadius: "8px",
  background: "linear-gradient(-45deg, #3db3c5, #274685)",
  width: "60%",
  fontSize: "20px",
  color: "white",
  display: "block",
  height: "50px",
  cursor: "pointer",
};

class Form extends React.Component {
  render() {
    const { fields, onSubmit, buttonLabel, linkTo, page } = this.props;

    return (
      <form style={formStyle} onSubmit={onSubmit}>
        <div>
          {fields.map((item, index) => {
            return (
              <div>
                <label style={labelStyle}>{item.label}</label>
                <input
                  type={item.type}
                  style={inputStyle}
                  required
                  // value={item.name === "Phone" ? FROM_NUMBER : null}
                  // disabled={item.name === "Phone" ? true : false}
                />
              </div>
            );
          })}
          {page === "verify" && (
            <span
              style={{
                background: "linear-gradient(-45deg, #3db3c5, #274685)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
              }}
            >
              Verification code is sent your mobile number!
            </span>
          )}

          {linkTo ? (
            <nav>
              <Link
                to={{ pathname: linkTo, state: { request_id: "request_id" } }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <button type="submit" style={submitStyle}>
                  {buttonLabel}
                </button>
              </Link>
            </nav>
          ) : (
            <div
              to={linkTo}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <button type="submit" style={submitStyle}>
                {buttonLabel}
              </button>
            </div>
          )}
          {page === "login" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <span>{"To create an account "}</span>
              <span>&nbsp;</span>
              <Link
                to={"/personal-details"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
                // onClick={(e) => onSubmit(e, navigate)}
              >
                <span>{"Click Here"}</span>
              </Link>
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default Form;
