import { createContext, useContext } from "react";

export const CardsContext = createContext({});

export const CardsDispatchContext = createContext(null);

export function useCards() {
  return useContext(CardsContext);
}

export function useCardsDispatch() {
  return useContext(CardsDispatchContext);
}
