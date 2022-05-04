function RenderFootNotes({ footNotes }) {
  return (
    <div>
      {footNotes.map((notes, i) => {
        return (
          notes && (
            <p key={"footNote" + notes + i} style={{ fontSize: "12px" }}>
              {notes}
            </p>
          )
        );
      })}
    </div>
  );
}

export default RenderFootNotes;
