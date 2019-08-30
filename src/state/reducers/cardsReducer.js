import { saveSession, clearSession } from "../../helpers/localStorageHelper";
import { actions as CardsActions } from "../actions/cardsActions";

const initialState = {
  cards: [],
  savedCards: [],
  loading: false
};

// Move a card from one column to another without mutating the state
const moveCard = (state, data) => {
  const { source, destination } = data;
  console.log({ data });
  const sourceColumn = source.droppableId;
  const card = state[sourceColumn][source.index];
  const removedItem = state[source.droppableId].filter(item => item !== card);
  const addedItem = [
    ...state[destination.droppableId].slice(0, destination.index),
    state[source.droppableId][source.index],
    ...state[destination.droppableId].slice(
      destination.index,
      state[destination.droppableId].length
    )
  ];
  return {
    ...state,
    [source.droppableId]: removedItem,
    [destination.droppableId]: addedItem
  };
};

const cardsReducer = (state = initialState, action) => {
  const { clearCards, saveCard, onGetCardsRequest, onGetCards } = CardsActions;
  const { data } = action;

  switch (action.type) {
    case onGetCardsRequest:
      return { ...state, loading: true };
    case onGetCards:
      let { cards } = data;
      if (state.savedCards)
        cards = data.cards.filter(
          card => !state.savedCards.some(item => item.id === card.id)
        );
      return { ...state, cards, loading: false };
    case clearCards:
      // Clear local storage
      clearSession();
      return { ...state, savedCards: [] };
    case saveCard:
      // Save the change to local storage
      saveSession(moveCard(state, data));
      return moveCard(state, data);
    default:
      return state;
  }
};

export default cardsReducer;
