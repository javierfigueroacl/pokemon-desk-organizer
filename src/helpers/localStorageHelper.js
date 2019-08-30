// It is necessary to use stringify since the object we want to
// save will be saved as a string in local storage
export const saveSession = session => {
  try {
    const serializedSession = JSON.stringify(session);
    localStorage.setItem("cards", serializedSession);
  } catch (err) {
    console.err(err);
  }
};

// To reconstruct the string in object, we use JSON.parse
export const loadSession = () => {
  try {
    const serializedSession = localStorage.getItem("cards");
    if (serializedSession === null) {
      return undefined;
    }
    return {
      cards: JSON.parse(serializedSession)
    };
  } catch (err) {
    return undefined;
  }
};

export const clearSession = () => {
  localStorage.clear();
};
