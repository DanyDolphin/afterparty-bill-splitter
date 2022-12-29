// React
import React, { useMemo, useState } from "react";
import { Participant, Part } from "./interfaces";

// Context
import { useAppContext, AppContextProvider, defaultCourt } from "./context";

// Components
import ParticipantCard from "./components/ParticipantCard";
import Splitter from "./components/Splitter";

// Styles
import "./App.css";


function App() {
  const [court, setCourt] = useState<Participant[]>(defaultCourt);
  const updateParticipant = (participant: Participant): void => {
    setCourt(court.map((p) => (p.id === participant.id ? participant : p)));
  };
  const updatePart = (participant: Participant, part: Part): void => {
    updateParticipant({
      ...participant,
      parts: participant.parts.map((p) => (p.id === part.id ? part : p)),
    });
  };
  const appContextValue = { court, setCourt, updateParticipant, updatePart };
  return (
    <AppContextProvider value={appContextValue}>
      <AppLayout />
    </AppContextProvider>
  );
}

const AppLayout = () => {
  const { court, setCourt } = useAppContext();

  const addParticipant = () => {
    const newParticipant: Participant = {
      id: court[court.length - 1].id + 1,
      name: "",
      parts: [{ id: 1, concept: "", total: 0, excluded: [] }],
    };
    setCourt([...court, newParticipant]);
  };

  const shareLink = useMemo(() => `${window.location.origin}/?d=${window.btoa(JSON.stringify(court))}`, [court])

  return (
    <div className='main-container'>
      <div className='container text-center'>
        <h1>AfterParty - Bill Splitter</h1>
        <p>A usefull tool to see each other's debt</p>
        <div className='flex wrap justify-center align-center'>
          {court.map((participant) => (
            <ParticipantCard key={participant.id} participant={participant} />
          ))}
          <button onClick={addParticipant}>+ Add participant</button>
        </div>
        <div className="flex justify-center mt">
          <Splitter/>
        </div>
        <button onClick={() => navigator.clipboard.writeText(shareLink)}>
          Copy link
        </button>
      </div>
    </div>
  );
};

export default App;
