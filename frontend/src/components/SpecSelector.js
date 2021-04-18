import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfColor from "../style/ProfColor";
import useChar from "../hooks/useChar";
import useData from "../hooks/useData";

const StyledProfName = styled.h1`
  color: ${(props) => ProfColor(props.prof)};
`;

const CheckboxRow = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
  justify-content: space-between;
  width: 300px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: ${(props) =>
    props.checked ? (props) => ProfColor(props.prof) : "white"};

  img {
    opacity: ${(props) => (props.checked ? "100%" : "60%")};
  }

  :hover {
    color: ${(props) => ProfColor(props.prof)};
    cursor: pointer;

    img {
      opacity: 100%;
    }
  }
`;

const Tipp = styled.h4`
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const SpecSelector = () => {
  const { specs } = useData();
  const { yourProf, setSpecs, yourSpecs } = useChar();
  const [selectedCounter, setSelectedCounter] = useState(0);
  const [selectedSpecs, setSelectedSpecs] = useState([]);

  useEffect(() => {
    setSelectedSpecs([]);
    setSelectedCounter(0);
  }, [yourProf]);

  const changeSelected = (e) => {
    //checkboxok esetén mik vannak kiválasztva
    if (selectedSpecs.includes(e.target.value)) {
      const newSelectedSpecs = selectedSpecs.filter(
        (spec) => spec !== e.target.value
      );
      setSelectedSpecs(newSelectedSpecs);
      //ha a négyzetből kivesszük a jelölést, akkor csökkentse a SelectedSpecs tömböt
      setSelectedCounter(selectedCounter - 1);
    } else {
      setSelectedSpecs([...selectedSpecs, e.target.value]);
      setSelectedCounter(selectedCounter + 1);
    }
    //max 3 specializációt lehet kiválasztani
  };

  if (specs.length <= 0) {
    return "Loading...";
  }

  const profsspec = specs[0].filter(
    //adott osztály specializációi
    (specialization) => specialization.profession === yourProf
  );

  const submit = (e) => {
    e.preventDefault();
    setSpecs(selectedSpecs);
  };

  return (
    <form onSubmit={submit}>
      {yourProf === "" ? (
        ""
      ) : (
        <div>
          <br />
          <StyledProfName style={{ display: "inline" }} prof={yourProf}>
            {yourProf}
          </StyledProfName>
          <h1 style={{ display: "inline" }}>
            's specializations
            {yourSpecs <= 0 ? (
              <text is="x3d" style={{ color: "red" }}>
                *
              </text>
            ) : (
              ""
            )}
          </h1>
          <Tipp>(You can choose maximum 3 specializatons)</Tipp>
          <div>
            {
              //checboxokkal saját karakter specializációinak kiválasztása
              profsspec.map((specialization) => (
                <div key={specialization.id}>
                  <CheckboxRow
                    style={{ paddingLeft: "20%" }}
                    prof={yourProf}
                    checked={selectedSpecs.includes("" + specialization.name)}
                  >
                    <input
                      type="checkbox"
                      onChange={changeSelected}
                      value={specialization.name}
                      checked={selectedSpecs.includes("" + specialization.name)}
                    />

                    <h3>{specialization.name}</h3>

                    <img src={specialization.icon} alt="" />
                  </CheckboxRow>
                </div>
              ))
            }

            <button
              type="submit"
              disabled={selectedCounter === 0 || selectedCounter > 3}
            >
              Save specs
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SpecSelector;
