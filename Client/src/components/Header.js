import React from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../img/Eye.png";

const divStyle = {
  marginBottom: "60px",
  display: "flex",
  width: "450px",
  alignItems: "center",
  justifyContent: "center",
};

const Header = ({ style }) => {
  const navigate = useNavigate();
  return (
    <div style={style ? { ...divStyle, ...style } : divStyle}>
      <img
        onClick={() => navigate("/")}
        src={Eye}
        width="20%"
        style={{
          marginRight: "20px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />

      <div style={{ flexDirection: "column" }}>
        <div className="header">Optho Clinic</div>
        <div className="description">Book an eye consultation with us</div>
      </div>
    </div>
  );
};

export default Header;
