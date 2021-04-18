import { useContext } from "react";
import { CharContext } from "../context/CharContext";

const useChar = () => {
  const context = useContext(CharContext);
  return context;
};

export default useChar;
