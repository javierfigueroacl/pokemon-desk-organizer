import React, { createContext, useContext, useReducer } from "react";

import { loadSession } from "./helpers/localStorageHelper";
import cardsReducer from "./state/reducers/cardsReducer";

export const CardsContext = createContext({});

export const CardsDispatchContext = createContext(null);

export function useCards() {
  return useContext(CardsContext);
}

export function useCardsDispatch() {
  return useContext(CardsDispatchContext);
}

export function CardsProvider({ children }) {
  const initialState = {
    cards: [],
    savedCards: [],
    selectedCard: null,
    loading: false,
  };

  const session = (loadSession() && loadSession().cards) || initialState;
  const [cards, dispatch] = useReducer(cardsReducer, session);

  return (
    <CardsContext.Provider value={cards}>
      <CardsDispatchContext.Provider value={dispatch}>
        {children}
      </CardsDispatchContext.Provider>
    </CardsContext.Provider>
  );
}
