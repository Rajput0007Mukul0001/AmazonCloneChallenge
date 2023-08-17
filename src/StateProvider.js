import React,{createContext,useContext,useReducer} from "react";

//prepare the data layer
export const StateContext = createContext();

//wrap our app and provide the Data Layer

export const StateProvider = ({reducer,intitalState,children})=>(
    <StateContext.Provider value={useReducer(reducer,intitalState)}>
        {children}
    </StateContext.Provider>
);

//pull the information from the data layer
export const useStateValue = () => useContext(StateContext);