import React, { useState } from "react";
import styled from "styled-components";

import useUser from "../hooks/useUser";

import '../style/UserSettings.css'

const StyledButton = styled.button`
  width: 300px;
  margin-bottom: 50px;
`;

const StyledInput = styled.input`
  width: 250px;
  margin-right: 0px;
`;

const UserSettings = () => {
  const [changeOne, setChangeOne] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const { changeSetting, loggedUsername, emailError, initEmailError, isChangedSuccessfully, removeSuccessfulText, setLocalFile, upload, file, weakPasswordError, changeWeakPasswordError, errorField } = useUser();

  const selectSetting = (e, option) => {
    e.preventDefault();
    setChangeOne(option);
    removeSuccessfulText();
  }

  const selectButton = (option) => {
    return (
      <StyledButton
        onClick={(e) => {
          selectSetting(e, option);
        }}
        disabled={changeOne === option}
      >
        Change {option}
      </StyledButton>
    )
  }

  const changePassword = (e) => {
    e.preventDefault();
    if (newPassword.length > 6) {
      changeSetting(newPassword, changeOne);
    } else {
      changeWeakPasswordError("Password must be at least 6 characters")
    }
  };

  const changeEmail = (e) => {
    e.preventDefault();
    changeSetting(newEmail, changeOne);
  };

  const changeSuccessful = () => {
    return (
      <h4 style={{ textDecorationLine: "underline" }}>
        {isChangedSuccessfully ? "Setting has been changed successfully" : ""}
      </h4>
    )
  }

  const confirmButton = (func) => {
    return (
      <StyledButton onClick={func}>Confirm change</StyledButton>
    )
  }

  return (
    <form>
      <h1>{loggedUsername}</h1>

      <div>
        {selectButton("picture")}
      </div>
      {changeOne === "picture" ? (
        <div>
          <input type="file" accept="image/jpeg" onChange={setLocalFile} />
          {file ? <img className="previewFile" src={URL.createObjectURL(file)} alt="preview" /> : ""}
          <br />
          {changeSuccessful()}
          {confirmButton(e => upload(e))}
        </div>
      ) : (
        ""
      )}

      <div>
        {selectButton("password")}
      </div>
      {changeOne === "password" ? (
        <div>
          <StyledInput
            onChange={(e) => {
              setNewPassword(e.target.value);
              changeWeakPasswordError("");
            }}
            placeholder="new password"
          />
          <br />
          {errorField(weakPasswordError)}
          {changeSuccessful()}
          {confirmButton(changePassword)}
        </div>
      ) : (
        ""
      )}

      <div>
        {selectButton("email")}
      </div>
      {changeOne === "email" ? (
        <div>
          <StyledInput
            onChange={(e) => {
              setNewEmail(e.target.value);
              initEmailError();
            }}
            placeholder="new e-mail address"
          />
          <br />
          {errorField(emailError)}
          {changeSuccessful()}
          {confirmButton((e) => changeEmail(e))}
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default UserSettings;
