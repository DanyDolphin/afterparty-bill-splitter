// React
import { useMemo } from "react";
import { useAppContext } from "../context";
import { Participant } from "../interfaces";

// App context

const Splitter = () => {
  const { court } = useAppContext();

  const calc = (a: Participant, b: Participant) => {
    return b.parts.reduce(
      (acum, cur) =>
        acum +
        (cur.excluded.includes(a.id)
          ? 0
          : cur.total / (court.length - cur.excluded.length)),
      0
    )
  }

  const debtTable = useMemo(
    () => court.map(a => court.map(b => calc(a,b)))
  , [court])

  return (
    <table>
      <tbody>
        {court.map((a,i) =>
          court.map((b,j) =>
            a.id === b.id || debtTable[j][i] >= debtTable[i][j] || debtTable[i][j] === 0 ? null : (
              <tr key={a.id + "-" + b.id}>
                <td>{a.name}</td>
                <td>=&gt;</td>
                <td>${(debtTable[i][j] - debtTable[j][i]).toFixed(2)}</td>
                <td>=&gt;</td>
                <td>{b.name}</td>
              </tr>
            )
          )
        )}
      </tbody>
    </table>
  );
};

export default Splitter;
