import { useEffect } from "react";

export default function useTitleSetter(input) {
  const title = "React Demo - Javier Figueroa";
  useEffect(() => {
    // Update the document title using the browser API
    if (input) document.title = input;
    else document.title = title;
  }, [input]);
}
