import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useData from "../hooks/useData";
import useChar from "../hooks/useChar";
import RaceColor from "../style/RaceColor";

const StyledRaceName = styled.h1`
  display: inline;
  color: ${(props) => RaceColor(props.race)};
`;

const RadioRow = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: ${(props) =>
    props.checked ? (props) => RaceColor(props.race) : "white"};

  :hover {
    color: ${(props) => RaceColor(props.race)};
  }
`;

const Tipp = styled.h4`
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Backstory = () => {
  const { backstoryQuestions, backstoryAnswers } = useData();
  const { yourRace, setBackstory, yourBackstory } = useChar();
  const [selectedBackstory, setSelectedBackstory] = useState("");

  useEffect(() => {
    setSelectedBackstory("");
    setBackstory("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yourRace]);

  if (backstoryQuestions.length <= 0) {
    return "Loading...";
  }

  if (backstoryAnswers.length <= 0) {
    return "Loading...";
  }

  const BackstoryQuestionsFix = backstoryQuestions[0].filter(
    (question) => question.races !== undefined
    /*kiszűrni questionök közül azokat, amelyeknek nincsen races propertyje*/
  );

  const raceBackstoryQuestions = BackstoryQuestionsFix.filter(
    (question) => question.races.includes(yourRace)
    /*adott faj backstory questionjei*/
  );

  const BackstoryAnswersFix = backstoryAnswers[0].filter(
    (answer) => answer.races !== undefined
    /*kiszűrni answerek közül azokat, amelyeknek nincsen races propertyje*/
  );

  const raceBackstoryAnswers = BackstoryAnswersFix.filter(
    (answer) => answer.races.includes(yourRace)
    /*adott faj backstory answerjei*/
  );

  const changeSelected = (e) => {
    setSelectedBackstory(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    setBackstory(selectedBackstory);
  };

  return (
    <form onSubmit={submit}>
      {yourRace === "" ? (
        ""
      ) : (
        <div>
          <br />
          <StyledRaceName style={{ display: "inline" }} race={yourRace}>
            {yourRace}
          </StyledRaceName>
          <h1 style={{ display: "inline" }}>
            's backstory
            {yourBackstory === "" ? (
              <text is="x3d" style={{ color: "red" }}>
                *
              </text>
            ) : (
              ""
            )}
          </h1>
          <Tipp>(You can choose only 1 backstory)</Tipp>
          <div>
            {raceBackstoryQuestions.map((question) => (
              <div key={question.id}>
                <h3 style={{ textAlign: "left", paddingLeft: "5%" }}>
                  {question.description}
                </h3>
                <ul>
                  {raceBackstoryAnswers
                    .filter((answer) => answer.question === question.id)
                    .map((answer) => (
                      <RadioRow
                        style={{ paddingLeft: "20%" }}
                        key={answer.id}
                        race={yourRace}
                        checked={selectedBackstory === answer.id}
                      >
                        <input
                          type="radio"
                          onChange={changeSelected}
                          value={answer.id}
                          checked={selectedBackstory === answer.id}
                        />
                        <div
                          dangerouslySetInnerHTML={{ __html: answer.title }}
                        />
                      </RadioRow>
                    ))}
                </ul>
              </div>
            ))}
            <button type="submit" disabled={selectedBackstory === ""}>
              Save backstory
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Backstory;
