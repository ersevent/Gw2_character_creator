import React, { useState } from "react";
import styled from "styled-components";

import useUser from "../hooks/useUser";
import useChar from "../hooks/useChar";

import Link from "../style/Link";
import "../style/UserSettings.css"

const HeaderStyle = styled.div`
  height: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: rgb(214, 35, 12, 0.2);
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 120%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: 50%;
`;

const LoginStyle = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderButton = styled.button`
  background-color: black;
  border-radius: 3px;
  border-color: rgb(214, 35, 12);
  color: rgb(214, 35, 12);
  font-size: 100%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  height: 30px;
  width: 150px;
  margin-bottom: 0%;
  margin-top: 0%;
  margin-right: 30px;
  margin-left: 20px;
`;

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginError, loginUser, logoutUser, successfulLogin, removeLoggedIn, loggedUsername, usernameId } = useUser();

  const {
    initCharCreationPage
  } = useChar();

  const login = () => {
    loginUser(username, password)
  }

  const logout = () => {
    logoutUser()
    removeLoggedIn()
    initCharCreationPage()    //logout esetén character build oldalon ne maradjanak bent a kijelölt dolgok
  }

  return (
    <HeaderStyle>
      {successfulLogin ? (<Nav>
        <Link exact to="/home">
          Character Builder
        </Link>
        <Link exact to="/mycharacter">
          My Character
        </Link>
      </Nav>) : (<Nav>{""}</Nav>)}

      <LoginStyle>
        <text is="x3d" style={{ color: "yellow", fontWeight: "bold", textDecorationLine: "underline", marginRight: "10px" }}> {loginError}</text>
        {usernameId !== "" ?
          <img className="profilePicture" src={`http://localhost:3001/api/files/${usernameId}.jpg`} alt="X" /> /* újonnan regisztráltnak X betű lesz default picture helyett */
          :
          ""}
        {successfulLogin ? (
          <div>
            <text is="x3d" style={{ textDecorationLine: "underline", backgroundColor: "rgb(96, 96, 96, 0.6)" }}> Logged in as {loggedUsername}</text>
            <Link exact to="/">
              <HeaderButton onClick={logout}>
                Log out
              </HeaderButton>
            </Link>
            <Link exact to="/usersettings">
              <HeaderButton>User settings</HeaderButton>
            </Link>
          </div>
        ) : (
          <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <HeaderButton onClick={login}>
              Log in
            </HeaderButton>
            <Link exact to="/register">
              <HeaderButton>Register</HeaderButton>
            </Link>
          </div>
        )}
      </LoginStyle>
    </HeaderStyle>
  );
};

export default Header;
