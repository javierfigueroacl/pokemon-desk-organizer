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

export const saveCard = (dispatch, data) =>
  dispatch({
    type: actions.saveCard,
    data,
  });

export const clearCards = (dispatch) =>
  dispatch({
    type: actions.clearCards,
  });

export const sendSelectedCardData = (dispatch, data) =>
  dispatch({
    type: actions.sendSelectedCardData,
    data,
  });

// First, dispatch onGetCardsRequest,
// the state is updated with the information
// that the request was sent. Once the response is
// received, it is dispatched onGetCards
export const getCards = (dispatch, apiGetCards, data) => {
  dispatch(onGetCardsRequest());
  return apiGetCards(data).then((response) => {
    dispatch(onGetCards(response.data));
  });
};
