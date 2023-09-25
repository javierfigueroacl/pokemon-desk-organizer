import { useEffect } from "react";
import { useQuery } from "react-query";
import { useCardsDispatch } from "../../../cardContext";

import {
  onGetCards,
  onGetCardsRequest,
} from "../../../state/actions/cardsActions";

const useFetchCardsRequest = (apiCall, input) => {
  const dispatch = useCardsDispatch();
  const { isLoading, refetch } = useQuery(
    ["cards", input],
    () =>
      apiCall(input).then((response) => {
        dispatch(onGetCards(response.data));
      }),
    { enabled: false }
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(onGetCardsRequest());
    }
  }, [isLoading, dispatch]);
  return { refetch };
};

export default useFetchCardsRequest;
