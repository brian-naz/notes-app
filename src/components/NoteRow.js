import { motion, useMotionValue } from "framer-motion";

const NoteRow = ({ note, deleteNote, setActiveNoteId }) => {
  const x = useMotionValue(0);
  const extractTextLines = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;

    const blocks = div.querySelectorAll("p, h1, h2, h3, li");

    const lines = Array.from(blocks)
      .map((block) => block.textContent.trim())
      .filter((text) => text.length > 0);

    return lines;
  };

  const lines = extractTextLines(note.text);
  const title = lines[0] || "New Note";
  const body = lines[1] || "";
  return (
    <div className="swipe-wrapper">
      <div className="delete-bg">Delete</div>

      <motion.div
        drag="x"
        style={{ x }}
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.x < -100) {
            deleteNote(note.id);
          }
        }}
        onClick={() => {
          if (x.get() === 0) {
            setActiveNoteId(note.id);
          }
        }}
        className="card-row"
      >
        <div className="note-left">
          <div className="note-title">{title}</div>
          {body && <div className="note-body">{body}</div>}
        </div>

        <div className="note-right">
          {new Date(note.timestamp).toLocaleDateString()}
        </div>
      </motion.div>
    </div>
  );
};

export default NoteRow;
