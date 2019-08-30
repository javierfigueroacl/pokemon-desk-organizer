import axios from "axios";

// URL (pending to solve CORS problem)
const URL = "https://api.pokemontcg.io/v1/cards";

// HTTP client: Axios
const getCards = name => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  return axios({
    method: "get",
    url: URL,
    params: { name },
    headers
  });
};

export default getCards;
