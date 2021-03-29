import { saveSession, clearSession } from "../../helpers/localStorageHelper";
import { actions as CardsActions } from "../actions/cardsActions";

const initialState = {
  cards: [],
  savedCards: [],
  loading: false
};

const removeCard = (column, card) => column.filter(item => item !== card);
const addCard = (column, card, index) => [
  ...column.slice(0, index),
  card,
  ...column.slice(index, column.length)
];

// Move a card from one column to another without mutating the state
const moveCard = (state, data) => {
  const { source, destination } = data;
  const card = state[source.droppableId][source.index];

  if (source.droppableId !== destination.droppableId)
    return {
      ...state,
      [source.droppableId]: removeCard(state[source.droppableId], card),
      [destination.droppableId]: addCard(
        state[destination.droppableId],
        card,
        destination.index
      )
    };
  return {
    ...state,
    [source.droppableId]: addCard(
      removeCard(state[source.droppableId], card),
      card,
      destination.index
    )
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
