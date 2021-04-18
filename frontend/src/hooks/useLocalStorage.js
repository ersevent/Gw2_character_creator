import { useEffect, useState } from "react";

const useLocalStorage = (key, initialState) => {
  const [values, setValues] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    if (values) {
      window.localStorage.setItem(key, JSON.stringify(values));
    }
  }, [values, key]);

  return { values, setValues };
};

export default useLocalStorage;
