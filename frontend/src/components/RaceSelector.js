import React, { useState } from "react";
import styled from "styled-components";

import useChar from "../hooks/useChar";
import useData from "../hooks/useData";
import RaceColor from "../style/RaceColor";

const StyledRaceName = styled.h2`
  display: inline;
  color: ${(props) => RaceColor(props.race)};
`;

const RaceSelector = () => {
  const { races } = useData();
  const [selectedRace, setSelectedRace] = useState("");
  const { setRace, yourRace, selectTitle, dropdownMenu } = useChar();

  const changeRace = (e) => {
    //saját karakter fajának megváltoztatása
    setSelectedRace(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    setRace(selectedRace);
  };

  if (races.length <= 0) {
    return "Loading...";
  }

  return (
    <form onSubmit={submit}>
      {selectTitle("Select your race", yourRace, races[0])}

      {dropdownMenu(changeRace, selectedRace, races[0])}

      {yourRace === "" ? (
        <div>
          <br />
        </div>
      ) : (
        <div>
          <br />
          <h2 style={{ display: "inline" }}>Your race: </h2>
          <StyledRaceName style={{ display: "inline" }} race={yourRace}>
            {yourRace}
          </StyledRaceName>
        </div>
      )}
      <button type="submit" disabled={selectedRace === ""}>
        {" "}
        Save Race{" "}
      </button>
    </form>
  );
};

export default RaceSelector;
