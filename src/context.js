import React from 'react';

export const HabitualContext = React.createContext({
  puppies: "puppies",
  kitties: "kitties",
});

const HabitualContextProvider = props => {
  return (
    <HabitualContext.Provider value = {"example"}>
      {props.children}
    </HabitualContext.Provider>
  )
};

export default HabitualContextProvider;