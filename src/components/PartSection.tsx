// React
import React from "react";
import { Part, Participant } from "../interfaces";

// Context
import { useAppContext } from "../context";

// Properties
type PartSectionProperties = {
  participant: Participant;
  part: Part;
};

const PartSection = ({ participant, part }: PartSectionProperties) => {
  const { court, updatePart, updateParticipant } = useAppContext();

  const deletePart = () => {
    updateParticipant({...participant, parts: participant.parts.filter(p => p.id !== part.id)})
  }

  return (
    <div className='card'>
      <button className="delete" onClick={deletePart}>&times;</button>
      <input
        type='text'
        id='concept'
        name='concept'
        value={part.concept}
        onChange={(e) =>
          updatePart(participant, { ...part, concept: e.target.value })
        }
      />
      <br />
      <div className='d-flex'>
        <input
          type='number'
          id='total'
          name='total'
          value={part.total}
          onChange={(e) =>
            updatePart(participant, {
              ...part,
              total: Number(e.target.value),
            })
          }
        />
        <div>
          {court.map((p) => (
              <span
                key={p.id}
                className={
                  "chip " + (part.excluded.includes(p.id) ? "" : "selected")
                }
                onClick={() =>
                  updatePart(participant, {
                    ...part,
                    excluded: part.excluded.includes(p.id)
                      ? part.excluded.filter((e) => e !== p.id)
                      : [...part.excluded, p.id],
                  })
                }
              >
                {p.name}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PartSection;
