import React from "react";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(props.navigateTo);
      }}
      className={props.btnStyle}
    >
      {props.text}
    </button>
  );
};

export default Button;
