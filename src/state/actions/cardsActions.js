export const actions = {
  onGetCardsRequest: "ON_GET_CARDS_REQUEST",
  onGetCards: "ON_GET_CARDS",
  saveCard: "SAVE_CARD",
  clearCards: "CLEAR_CARDS",
  sendSelectedCardData: "SEND_SELECTED_CARD_DATA",
};

export const onGetCards = (data) => ({
  type: actions.onGetCards,
  data,
});

export const onGetCardsRequest = () => ({
  type: actions.onGetCardsRequest,
});

export const saveCard = (data) => ({
  type: actions.saveCard,
  data,
});

export const clearCards = () => ({
  type: actions.clearCards,
});

export const sendSelectedCardData = (data) => ({
  type: actions.sendSelectedCardData,
  data,
});
