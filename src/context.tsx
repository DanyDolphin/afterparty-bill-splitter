import { createContext, useContext } from "react";
import { Participant, Part } from "./interfaces";

// App context
interface AppContextInterface {
  court: Participant[];
  setCourt: (court: Participant[]) => void;
  updateParticipant: (participant: Participant) => void;
  updatePart: (participant: Participant, part: Part) => void;
}

function createCtx<A extends AppContextInterface>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx () : AppContextInterface {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

const context = createCtx<AppContextInterface>();

// Default court value
const urlParams = new URLSearchParams(window.location.search)
let court
try {
  court = JSON.parse(window.atob(urlParams.get('d') || ''))
} catch (e) {
  court = [
    {
      id: 1,
      name: "",
      parts: [{ id: 1, concept: "", total: 0, excluded: [] }],
    },
  ]
}

export const defaultCourt = court
export const useAppContext = context[0]
export const AppContextProvider = context[1]
