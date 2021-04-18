import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import MyCharacter from "./components/MyCharacter";
import Header from "./components/Header";

import ProfSelector from "./components/ProfSelector";
import RaceSelector from "./components/RaceSelector";
import SpecSelector from "./components/SpecSelector";
import { CharProvider } from "./context/CharContext";
import { DataProvider } from "./context/DataContext";
import { UserProvider } from "./context/UserContext";
import FinishBuild from "./components/FinishBuild";
import ErrorBoundary from "./components/ErrorBoundary";
import Backstory from "./components/Backstory";
import Register from "./components/Register";
import UserSettings from "./components/UserSettings";
import GlobalStyle from "./style/GlobalStyle";
import ContentStyle from "./style/ContentStyle";
import Background from "./style/Background";
import InitialPage from "./components/InitialPage";
import Page404 from "./components/Page404";

const Character = () => {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <UserProvider>
        <DataProvider>
          <CharProvider>
            <BrowserRouter>
              <Header />
              <Background>
                <ContentStyle>
                  <Switch>
                    <Route exact path="/">
                      <InitialPage />
                    </Route>
                    <Route exact path="/home">
                      <RaceSelector />
                      <Backstory />
                      <ProfSelector />
                      <SpecSelector />
                      <FinishBuild />
                    </Route>
                    <Route exact path="/mycharacter">
                      <MyCharacter />
                    </Route>
                    <Route exact path="/register">
                      <Register />
                    </Route>
                    <Route exact path="/usersettings">
                      <UserSettings />
                    </Route>
                    <Route exact path="*">
                      <Page404 />
                    </Route>
                  </Switch>
                </ContentStyle>
              </Background>
            </BrowserRouter>
          </CharProvider>
        </DataProvider>
      </UserProvider>
    </ErrorBoundary>
  );
};

export default Character;
