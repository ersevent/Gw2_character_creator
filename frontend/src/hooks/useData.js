import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const useData = () => {
  const context = useContext(DataContext);
  return context;
};

export default useData;
