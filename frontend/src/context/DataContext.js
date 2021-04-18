import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { reducer, initialState, LOAD_DATA } from "../reducer/DataReducer";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [specs, dispatchSpecs] = useReducer(reducer, initialState);
  const [races, dispatchRaces] = useReducer(reducer, initialState);
  const [profs, dispatchProfs] = useReducer(reducer, initialState);
  const [backstoryQuestions, dispatchQuestions] = useReducer(
    reducer,
    initialState
  );
  const [backstoryAnswers, dispatchAnswers] = useReducer(reducer, initialState);

  useEffect(() => {
    loadSpecs();
    loadRaces();
    loadProfs();
    loadQuestions();
    loadAnswers();
    // eslint-disable-next-line
  }, []);

  const dispatchToReducer = async (option, dispatchOption) => {
    try {
      const { data } = await axios(
        `https://api.guildwars2.com/v2/${option}?ids=all`
      );

      dispatchOption({ type: LOAD_DATA, payload: data });
    } catch (err) {
      console.log(err);
    }
  }



  const loadSpecs = async () => {
    //specializációk letöltése
    dispatchToReducer("specializations", dispatchSpecs)
  };

  const loadRaces = async () => {
    //fajok letöltése
    dispatchToReducer("races", dispatchRaces)
  };

  const loadProfs = async () => {
    //osztályok letöltése
    dispatchToReducer("professions", dispatchProfs)
  };

  const loadQuestions = async () => {
    //osztályok letöltése
    dispatchToReducer("backstory/questions", dispatchQuestions)
  };

  const loadAnswers = async () => {
    //osztályok letöltése
    dispatchToReducer("backstory/answers", dispatchAnswers)
  };

  return (
    <DataContext.Provider
      value={{
        specs,
        races,
        profs,
        backstoryQuestions,
        backstoryAnswers
      }}
      {...props}
    />
  );
};
