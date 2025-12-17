import { useEffect } from "react";
import { useMatches } from "react-router-dom";

export default function TitleManager() {
  const matches = useMatches();

  useEffect(() => {
    const lastMatch = matches[matches.length - 1];
    const title = lastMatch?.handle?.title || "My App";
    document.title = `MR Project:: ${title}`;
  }, [matches]);

  return null;
}