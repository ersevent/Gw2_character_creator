import { createGlobalStyle } from "styled-components";
import gw2bg from "../img/gw2bg.jpg";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: white;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${gw2bg});
    background-attachment: fixed;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  button {
  background-color: black;
  border-radius: 5px;
  border-color: rgb(214, 35, 12);
  color: rgb(214, 35, 12);
  font-size: 120%; 
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  height: 35px;
  width: 200px;
  margin-bottom: 5%;
  margin-top: 3%;
  
  :hover {
    color: white;
    border-color: white;
    font-weight: bold;
    cursor: pointer;
  }

  :disabled {
    opacity: 40%;
    cursor: auto;
    border-color: grey;
    color: grey;
    font-weight: normal;
  }
}

input{
  background-color: black;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  height: 25px;
  margin-right: 20px;

  ::placeholder{
    color: red;
  }
}

h1{
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
}

select { 
  width: 40%;
  height: 30px;
  text-align: center;
  align-items: center;
  padding: 0;
  background-color: rgb(0,0,0);
  font-size: 16px;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

form{
  border-left: thin solid red;
  padding: 20px;
}
`;

export default GlobalStyle;
