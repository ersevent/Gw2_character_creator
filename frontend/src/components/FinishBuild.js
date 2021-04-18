import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useChar from "../hooks/useChar";
import { useHistory } from "react-router-dom";

const StyledInput = styled.input`
  color: ${(props) => (props.isNotAvailable ? "red" : "white")};
`;

const FinishBuild = () => {
  const {
    yourRace,
    yourProf,
    yourSpecs,
    yourBackstory,
    yourChars,
    getAllCharacters,
    createCharacter,
    initCharCreationPage,
    selectTitle
  } = useChar();
  const [buildName, setBuildName] = useState("");
  const history = useHistory();

  const changeName = (e) => {
    setBuildName(e.target.value);
  };

  useEffect(() => {
    getAllCharacters() //buildname checkolás miatt
    // eslint-disable-next-line
  }, [])

  const buildNameAlreadyExist = yourChars.map(
    (char) => char.buildName === buildName
  );

  const isAnythingMissing =
    yourRace === "" ||
    yourProf === "" ||
    buildName === "" ||
    yourSpecs.length === 0 ||
    yourBackstory === "";

  const raceIsMissing = yourRace === "" ? "Race " : "";

  const profIsMissing = yourProf === "" ? "Profession " : "";

  const specIsMissing = yourSpecs.length === 0 ? "Specializations " : "";

  const backstoryIsMissing = yourBackstory === "" ? "Backstory " : "";

  const submit = async (e) => {
    e.preventDefault();
    //karakter adatainak átmozgatása My Character fülre
    createCharacter(yourRace, yourProf, yourSpecs, yourBackstory, buildName)
    initCharCreationPage()
    history.push("/mycharacter");
  };

  return (
    <form onSubmit={submit}>

      {selectTitle("Name your character", buildName)}

      {buildName === "" ? (
        ""
      ) : (
        <div>
          {buildNameAlreadyExist.includes(true) ? (
            <h5>
              Character name is{" "}
              <text is="x3d" style={{ color: "red" }}>
                NOT
              </text>{" "}
              available
            </h5>
          ) : (
            <h5>Character name is available</h5>
          )}
        </div>
      )}

      <StyledInput
        isNotAvailable={buildNameAlreadyExist.includes(true)}
        onChange={changeName}
        placeholder="Character's name"
        value={buildName}
      />
      <button
        style={{ width: "250px" }}
        type="submit"
        disabled={isAnythingMissing || buildNameAlreadyExist.includes(true)}
      >
        Create Character
      </button>
      <h4 style={{ color: "red", textDecorationLine: "underline" }}>
        {isAnythingMissing && buildName.length !== 0
          ? "Missing: " +
          raceIsMissing +
          backstoryIsMissing +
          profIsMissing +
          specIsMissing
          : ""}
      </h4>
    </form>
  );
};

export default FinishBuild;
