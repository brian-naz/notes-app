import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Folders from "./components/Folders";
import NoteList from "./components/NoteList";
import Note from "./components/Note";
import "./index.css";

const App = ({ theme = "system" }) => {
  const [folders, setFolders] = useState(() => {
    const stored = localStorage.getItem("ios-notes");
    return stored ? JSON.parse(stored) : [{ id: 1, name: "Notes", notes: [] }];
  }); 

  const [activeFolderId, setActiveFolderId] = useState(1);
  const [activeNoteId, setActiveNoteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("ios-notes", JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light",
      );
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const activeFolder = folders.find((f) => f.id === activeFolderId);
  const activeNote = activeFolder?.notes.find((n) => n.id === activeNoteId);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: "",
      timestamp: new Date().toISOString(),
    };

    setFolders(
      folders.map((folder) =>
        folder.id === activeFolderId
          ? { ...folder, notes: [newNote, ...folder.notes] }
          : folder,
      ),
    );

    setActiveNoteId(newNote.id);
  };

  const deleteNote = (noteId) => {
    setFolders(
      folders.map((folder) =>
        folder.id === activeFolderId
          ? { ...folder, notes: folder.notes.filter((n) => n.id !== noteId) }
          : folder,
      ),
    );
  };

  const editNote = (noteId, text) => {
    setFolders(
      folders.map((folder) =>
        folder.id === activeFolderId
          ? {
              ...folder,
              notes: folder.notes.map((n) =>
                n.id === noteId ? { ...n, text } : n,
              ),
            }
          : folder,
      ),
    );
  };

  const createFolder = (name) => {
    const newFolder = {
      id: Date.now(),
      name,
      notes: [],
    };

    setFolders((prev) => [...prev, newFolder]);
  };

  return (
    <div className="ios-app">
      <AnimatePresence mode="wait">
        {!activeFolderId ? (
          <motion.div
            key="folders"
            className="page"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Folders
              folders={folders}
              setActiveFolderId={setActiveFolderId}
              createFolder={createFolder}
            />
          </motion.div>
        ) : !activeNoteId ? (
          <motion.div
            key="list"
            className="page"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <NoteList
              folder={activeFolder}
              setActiveFolderId={setActiveFolderId}
              setActiveNoteId={setActiveNoteId}
              addNote={addNote}
              deleteNote={deleteNote}
            />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            className="page"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Note
              note={activeNote}
              setActiveNoteId={setActiveNoteId}
              editNote={editNote}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
