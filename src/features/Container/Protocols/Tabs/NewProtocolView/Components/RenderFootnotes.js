import { v4 as uuidv4 } from "uuid";

function RenderFootNotes({ footNotes }) {
  return (
    <div>
      {footNotes.map((notes, i) => {
        return (
          notes && (
            <p key={uuidv4()} style={{ fontSize: "12px" }}>
              {notes}
            </p>
          )
        );
      })}
    </div>
  );
}

export default RenderFootNotes;
