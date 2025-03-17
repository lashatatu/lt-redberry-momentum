import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState({
    filter1: [],
    filter2: [],
    filter3: [],
  });

  const toggleSelection = (dropdown, item) => {
    setSelectedItems((prev) => {
      const isSelected = prev[dropdown].includes(item);
      if (isSelected) {
        return {
          ...prev,
          [dropdown]: prev[dropdown].filter((i) => i !== item),
        };
      } else {
        return {
          ...prev,
          [dropdown]: [...prev[dropdown], item],
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
  };

  return (
    <FilterContext.Provider
      value={{ selectedItems, toggleSelection, clearAllSelections }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
