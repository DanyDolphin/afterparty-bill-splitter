// Interfaces
import { Part, Participant } from "../interfaces";

// App context
import { useAppContext } from "../context";
import PartSection from "./PartSection";

// Properties
type ParticipantCardProperties = {
  participant: Participant;
};

const ParticipantCard = ({ participant }: ParticipantCardProperties) => {
  const { updateParticipant, court, setCourt } = useAppContext();

  const addPart = () => {
    const newPart: Part = {
      id: participant.parts[participant.parts.length - 1].id + 1,
      concept: "",
      total: 0,
      excluded: [],
    };
    updateParticipant({
      ...participant,
      parts: [...participant.parts, newPart],
    });
  };

  const deleteParticipant = () => {
    setCourt(court.filter((p) => p.id !== participant.id));
  };

  return (
    <div className='card participant-section'>
      <button className='delete' onClick={deleteParticipant}>
        &times;
      </button>
      <input
        type='text'
        placeholder='Participant'
        value={participant.name}
        onChange={(e) =>
          updateParticipant({ ...participant, name: e.target.value })
        }
      />
      <hr />
      {participant.parts.map((part) => (
        <PartSection key={part.id} participant={participant} part={part} />
      ))}
      <button onClick={addPart}>+ Add part</button>
    </div>
  );
};

export default ParticipantCard;
