import React, { useState } from "react";
import useChar from "../hooks/useChar";
import useData from "../hooks/useData";
import styled from "styled-components";
import ProfColor from "../style/ProfColor";

const StyledProfName = styled.h2`
  display: inline;
  color: ${(props) => ProfColor(props.prof)};
`;

const ProfSelector = () => {
  const { profs } = useData();
  const { setProf, yourProf, setSpecs, selectTitle, dropdownMenu } = useChar();
  const [selectedProf, setSelectedProf] = useState("");

  const changeProf = (e) => {
    //saját karakter osztályának megváltoztatása
    setSelectedProf(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    setProf(selectedProf);
    setSpecs([]);
  };

  if (profs.length <= 0) {
    return "Loading...";
  }

  const selectProfFromAllPRofs = profs[0].filter(
    (prof) => prof.name === yourProf
  );

  return (
    <form onSubmit={submit}>
      <br />
      <br />
      {selectTitle("Select your profession", yourProf)}

      {dropdownMenu(changeProf, selectedProf, profs[0])}

      {yourProf === "" ? (
        <div>
          <br />
        </div>
      ) : (
        <div>
          <br />
          <h2 style={{ display: "inline" }}>Your profession: </h2>
          <StyledProfName prof={yourProf}>{yourProf}</StyledProfName>
          <img src={selectProfFromAllPRofs[0].icon} alt="" />
        </div>
      )}
      <button type="submit" disabled={selectedProf === ""}>
        Save Profession
      </button>
    </form>
  );
};

export default ProfSelector;
