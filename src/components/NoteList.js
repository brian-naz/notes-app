import React, { useState } from "react";
import NoteRow from "./NoteRow";

const NoteList = ({
  folder,
  setActiveFolderId,
  setActiveNoteId,
  addNote,
  deleteNote,
}) => {
  const [search, setSearch] = useState("");

  const filtered = folder.notes.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase()),
  );

  const groupNotesByDate = (notes) => {
    const groups = {};
    const now = new Date();

    notes.forEach((note) => {
      const date = new Date(note.timestamp);

      const diffTime = now - date;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let label;

      if (diffDays === 0) {
        label = "Today";
      } else if (diffDays === 1) {
        label = "Yesterday";
      } else if (diffDays <= 7) {
        label = "Previous 7 Days";
      } else if (diffDays <= 30) {
        label = "Previous 30 Days";
      } else {
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        label = `${month} ${year}`;
      }

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(note);
    });

    return groups;
  };

  const sortedNotes = [...filtered].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );

  const grouped = groupNotesByDate(sortedNotes);

  return (
    <div className="screen">
      <div className="screen-header">
        <div className="header-top">
          <button
            className="circle-btn"
            onClick={() => setActiveFolderId(null)}
          >
            ‹
          </button>
        </div>

        <h1 className="screen-title">Notes</h1>
      </div>

      <div className="screen-scroll">
        {Object.entries(grouped).map(([label, notes]) => (
          <div key={label} className="note-section">
            <div className="section-header">{label}</div>

            {notes.map((note) => (
              <NoteRow
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                setActiveNoteId={setActiveNoteId}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="notes-bottom">
        <input
          className="bottom-search glass"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="circle-btn glass" onClick={addNote}>
          +
        </button>
      </div>
    </div>
  );
};

export default NoteList;
