import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(location.pathname);

  const [selectedItems, setSelectedItems] = useState(() => {
    const savedFilters = localStorage.getItem("filterState");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          filter1: [],
          filter2: [],
          filter3: [],
        };
  });

  useEffect(() => {
    if (previousPath === "/" && location.pathname !== "/") {
      clearAllSelections();
    }
    setPreviousPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("filterState", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const toggleSelection = (filterId, value, replace = false) => {
    setSelectedItems((prev) => {
      if (replace) {
        return {
          ...prev,
          [filterId]: [value],
        };
      } else {
        const currentSelections = [...prev[filterId]];
        const index = currentSelections.indexOf(value);

        if (index > -1) {
          currentSelections.splice(index, 1);
        } else {
          currentSelections.push(value);
        }

        return {
          ...prev,
          [filterId]: currentSelections,
        };
      }
    });
  };

  const clearAllSelections = () => {
    setSelectedItems({
      filter1: [],
      filter2: [],
      filter3: [],
    });
    localStorage.removeItem("filterState");
  };

  return (
    <FilterContext.Provider
      value={{
        selectedItems,
        toggleSelection,
        clearAllSelections,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
