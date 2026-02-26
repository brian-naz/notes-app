import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const Note = ({ note, setActiveNoteId, editNote }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.text || "",
    editorProps: {
      attributes: {
        class: "editor-content",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== note.text) {
        editNote(note.id, html);
      }
    },
  });

  useEffect(() => {
    if (!editor || !note) return;

    if (editor.getHTML() !== note.text) {
      editor.commands.setContent(note.text || "", false);
    }
  }, [note?.id]);

  if (!note) return null;

  const handleFocusEditor = (e) => {
    if (editor && !editor.isFocused) {
      editor.chain().focus().run();
    }
  };

  return (
    <div className="note-detail" onClick={handleFocusEditor}>
      <div className="screen-header">
        <div className="header-top">
          <button
            className="circle-btn glass"
            onClick={(e) => {
              e.stopPropagation(); 
              setActiveNoteId(null);
            }}
          >
            ‹
          </button>
        </div>
      </div>

      <div className="detail-date">
        {new Date(note.timestamp).toLocaleString()}
      </div>
      <div className="editor-wrapper">
        <EditorContent editor={editor} />
      </div>
      <div className="editor-toolbar-wrapper">
        <div className="editor-toolbar glass">
          <button
            className={`toolbar-btn ${editor?.isActive("bold") ? "active" : ""}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <b>B</b>
          </button>

          <button
            className={`toolbar-btn ${editor?.isActive("italic") ? "active" : ""}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <i>I</i>
          </button>

          <button
            className={`toolbar-btn ${editor?.isActive("underline") ? "active" : ""}`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <u>U</u>
          </button>

          <button
            className={`toolbar-btn ${editor?.isActive("strike") ? "active" : ""}`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <s>S</s>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
