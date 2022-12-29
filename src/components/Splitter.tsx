// React
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
          : cur.total / (court.length - cur.excluded.length - 1)),
      0
    ).toFixed(2)
  }

  return (
    <table>
      <tbody>
        {court.map((a) =>
          court.map((b) =>
            a.id === b.id || calc(a, b) === '0.00' ? null : (
              <tr key={a.id + "-" + b.id}>
                <td>{a.name}</td>
                <td>=&gt;</td>
                <td>{calc(a, b)}</td>
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
