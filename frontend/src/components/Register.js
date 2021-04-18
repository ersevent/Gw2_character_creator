import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import axios from "axios";
//import validator from "validator";
import { useHistory } from "react-router-dom";

import useUser from "../hooks/useUser";

const RegisterInput = styled.input`
  width: 200px;
  margin-right: 0px;
  margin-bottom: 20px;
`;

const RadioRow = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-left: 30%;
  color: ${(props) => (props.checked ? "red" : "white")};

  :hover {
    color: red;
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const { userError, createUser, successfulRegister, initSuccessfulRegister, emailError, weakPasswordError, changeWeakPasswordError, changeEmailError, changeUserError, errorField } = useUser();

  const history = useHistory();


  const usernameIsMissing = username === "" ? "Username " : "";

  const passwordIsMissing = password === "" ? "Password " : "";

  const genderIsMissing = gender === "" ? "Gender " : "";

  const emailIsMissing = email === "" ? "Email " : "";

  const isAnythingMissing =
    usernameIsMissing !== "" || passwordIsMissing !== "" || emailIsMissing !== "" || genderIsMissing !== "";

  const register = (e) => {
    e.preventDefault();
    if (password.length > 6) {
      createUser(username, password, gender, email);
    } else {
      changeWeakPasswordError("Password must be at least 6 characters")
    }
  }

  useEffect(() => {
    if (successfulRegister) {
      history.push('/')
      initSuccessfulRegister()
    }
    // eslint-disable-next-line
  }, [successfulRegister])

  const requiredField = (params) => {
    return params === "" ? (
      <text is="x3d" style={{ color: "red" }}>
        *
      </text>
    ) : (
      ""
    );
  };

  const field = (fieldName, option, setoption) => {
    return (
      <div>
        <RegisterInput
          onChange={setoption}
          value={option}
          placeholder={fieldName}
        />
      </div>
    )
  }

  const radioRow = (rowName) => {
    return (
      <RadioRow checked={gender === rowName}>
        <input
          type="radio"
          onChange={(e) => setGender(e.target.value)}
          value={rowName}
          checked={gender === rowName}
        />
        <div>{rowName}</div>
      </RadioRow>
    )
  }

  const title = (titleName, titleValue) => {
    return (
      <h1>{titleName}{requiredField(titleValue)}</h1>
    )
  }

  return (
    <form>
      <div>
        {title("Username", username)}
        {field("Username", username, (e) => { setUsername(e.target.value); changeUserError("") })}

        {title("Password", password)}
        {field("Password", password, (e) => { setPassword(e.target.value); changeWeakPasswordError("") })}

        {title("Gender", gender)}
        {radioRow("Male")}
        {radioRow("Female")}

        {title("E-mail address", email)}
        {field("E-mail address", email, (e) => { setEmail(e.target.value); changeEmailError("") })}

        <br />

        <button disabled={isAnythingMissing} onClick={(e) => register(e)}>Register</button>

      </div>
      {errorField(userError)}
      {errorField(emailError)}
      {errorField(weakPasswordError)}
    </form>
  );
};

export default Register;
