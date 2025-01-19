import { useState, useEffect } from "react";

// Custom hook to detect if the screen width is mobile or web
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQueryList.matches);

    // Initialize the state
    updateMatches();

    // Set up the listener for screen resizing
    mediaQueryList.addEventListener("change", updateMatches);

    // Clean up the listener on component unmount
    return () => mediaQueryList.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
};

export default useMediaQuery;
