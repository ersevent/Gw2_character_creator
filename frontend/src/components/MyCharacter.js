import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RaceColor from "../style/RaceColor";
import ProfColor from "../style/ProfColor";
import useChar from "../hooks/useChar";
import useData from "../hooks/useData";

const StyledRaceName = styled.h2`
  display: inline;
  color: ${(props) => RaceColor(props.race)}};
`;

const StyledProfName = styled.h2`
  display: inline;
  color: ${(props) => ProfColor(props.prof)};
`;

const MyCharacter = () => {
  const { yourChars, removeFromMyCharacter, getCharacters } = useChar();
  const { backstoryQuestions, backstoryAnswers } = useData();
  const [selectedBuild, setSelectedBuild] = useState("");
  const [yourBsQuestion, setYourBsQuestion] = useState([]);
  const [yourBsAnswer, setYourBsAnswer] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    getCharacters()
    // eslint-disable-next-line
  }, [])

  const changeBuild = (e) => {
    setSelectedBuild(e.target.value);
    if (isDeleted === true) setIsDeleted(false);
  };

  const build = yourChars.filter((char) => char.buildName === selectedBuild);

  useEffect(() => {
    /*adott build backstoryjának visszakeresése ID alapján*/
    if (selectedBuild !== "") {
      setYourBsQuestion(
        backstoryQuestions[0].filter((question) =>
          question.answers.includes(build[0].yourBackstory)
        )
      );
      setYourBsAnswer(
        backstoryAnswers[0].filter(
          (answer) => answer.id === build[0].yourBackstory
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBuild]);

  const deleteCharacter = async (id) => {
    /*adott build törlése*/
    removeFromMyCharacter(id);
    setSelectedBuild("");
    setIsDeleted(true);
  };

  if (yourChars === undefined) {
    return "Loading..."
  }

  return (
    <form style={{ textAlign: "left" }}>
      <div style={{ textAlign: "center" }}>
        <select
          style={{ marginTop: "5%" }}
          onChange={changeBuild}
          value={selectedBuild}
        >
          <option value={""}>------------</option>
          {
            //legördülő menüből az elmentett buildek közül 1-et kiválasztani
            yourChars.map((char) => (
              <option key={Math.random() * 100} value={char.buildName}>
                {char.buildName}
              </option>
            ))
          }
        </select>
      </div>

      {selectedBuild === "" ? (
        isDeleted ? (
          <h2 style={{ textAlign: "center" }}>
            Your character had been deleted!
          </h2>
        ) : (
          <h2 style={{ textAlign: "center" }}>
            You have to select a character!
          </h2>
        )
      ) : (
        <div>
          <h1 style={{ textAlign: "center", color: "rgb(214, 35, 12)" }}>
            {build[0].buildName}
          </h1>
          <h3 style={{ textDecorationLine: "underline", display: "inline" }}>
            Your character's race:{" "}
          </h3>
          <StyledRaceName
            style={{ paddingLeft: "10px", display: "inline" }}
            race={build[0].yourRace}
          >
            {build[0].yourRace}
          </StyledRaceName>
          <br />
          <div>
            <br />
            <h3
              style={{
                textDecorationLine: "underline",
                display: "inline"
              }}
            >
              Your character's backstory:{" "}
            </h3>
            {yourBsQuestion[0] === undefined ? (
              "Loading"
            ) : (
              <h3
                style={{
                  paddingLeft: "10px",
                  fontStyle: "italic",
                  display: "inline"
                }}
              >
                {yourBsQuestion[0].description.slice(
                  0,
                  yourBsQuestion[0].description.indexOf("_")
                )}
              </h3>
            )}

            {yourBsAnswer[0] === undefined ? (
              "Loading"
            ) : (
              <StyledRaceName
                style={{ display: "inline" }}
                race={build[0].yourRace}
              >
                {yourBsAnswer[0].title}
              </StyledRaceName>
            )}
          </div>
          <br />
          <h3 style={{ textDecorationLine: "underline", display: "inline" }}>
            Your character's profession:{" "}
          </h3>
          <StyledProfName
            style={{ paddingLeft: "10px", display: "inline" }}
            prof={build[0].yourProf}
          >
            {build[0].yourProf}
          </StyledProfName>
          <h3 style={{ textDecorationLine: "underline" }}>Specializations:</h3>
          <div>
            <ul style={{ fontSize: "80%" }}>
              {build[0].yourSpecs.map((spec) => (
                <li key={Math.random() * 100}>
                  <StyledProfName prof={build[0].yourProf}>
                    {spec}
                  </StyledProfName>
                </li>
              ))}
            </ul>
          </div>
          <button style={{ width: "40%" }} onClick={() => deleteCharacter(build[0]._id)}>
            Remove Character
          </button>
        </div>
      )}
    </form>
  );
};

export default MyCharacter;
