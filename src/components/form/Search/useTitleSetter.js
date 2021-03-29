import { useEffect, useState } from "react";

export default function useTitleSetter(input) {

  const [title, setTitle] = useState("");
  useEffect(() => {
    // Update the document title using the browser API(
    if (input.length > 0) document.title = `You clicked ${input} times`;
  }, [input]);

  return { title: document.title, setTitle };
}
