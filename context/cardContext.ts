import { createContext } from "react";

interface Card {
  ids: [];
}

export const CardContext = createContext<Card | undefined>(undefined);
