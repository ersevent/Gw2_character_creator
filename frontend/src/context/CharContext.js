import React, { createContext, useState } from "react";
//import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios"

export const CharContext = createContext();

export const CharProvider = (props) => {
  //const { values, setValues } = useLocalStorage("yourChar", []);
  const [yourChars, setYourChars] = useState([]);
  const [yourRace, setYourRace] = useState("");
  const [yourProf, setYourProf] = useState("");
  const [yourSpecs, setYourSpecs] = useState([]);
  const [yourBackstory, setYourBackstory] = useState("");

  const getCharacters = async () => {
    try {
      const { data } = await axios.get('/api/character')
      setYourChars(data)
    } catch (err) {
      console.log(err)
    }
  }

  const initCharCreationPage = () => {
    setYourProf("");
    setYourRace("");
    setYourSpecs([]);
  }

  const setProf = (prof) => {
    setYourProf(prof);
  };

  const setRace = (race) => {
    setYourRace(race);
  };

  const setSpecs = (specs) => {
    setYourSpecs(specs);
  };

  const createCharacter = async (yourRace, yourProf, yourSpecs, yourBackstory, buildName) => {
    try {
      await axios.post('/api/character', { yourRace, yourProf, yourSpecs, yourBackstory, buildName })
      getCharacters()
    } catch (err) {
      console.log(err)
    }
  }

  const getAllCharacters = async () => {
    const { data } = await axios.get('/api/allcharacters')
    setYourChars(data)
  }

  const removeFromMyCharacter = async (id) => {
    await axios.delete(`/api/character/${id}`)
    getCharacters()
  };

  const setBackstory = (backstory) => {
    setYourBackstory(backstory);
  };

  const selectTitle = (title, optionValue) => {
    return (
      <h1>
        {title}
        {optionValue === "" ? (
          <text is="x3d" style={{ color: "red" }}>
            *
          </text>
        ) : (
          /*is="x3d" nélkül hibát dob, hogy a browser nem ismeri fel a text-et*/
          ""
        )}
      </h1>
    )
  }

  const dropdownMenu = (changeOption, selectedOption, array) => {
    return (
      <select onChange={changeOption} value={selectedOption}>
        <option value={""}>------------</option>
        {
          //legördülő menüből saját karakter osztályának kiválasztása
          array.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))
        }
      </select>
    )
  }

  return (
    <CharContext.Provider
      value={{
        yourProf,
        setProf,
        yourRace,
        setRace,
        createCharacter,
        removeFromMyCharacter,
        getCharacters,
        yourChars,
        yourSpecs,
        setSpecs,
        yourBackstory,
        setBackstory,
        getAllCharacters,
        initCharCreationPage,
        selectTitle,
        dropdownMenu
      }}
      {...props}
    />
  );
};
