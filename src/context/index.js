import React, { createContext, useState, useEffect } from "react";
import Types from "proptypes";
import { makeid } from "../lib/utils";
import dbClient from "../lib/db";
import { convertToRaw, EditorState } from "draft-js";

const AppContext = createContext();

const Provider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState("");

  useEffect(() => {
    dbClient.openDB();
    dbClient.getNotes().then((dbNotes = []) => {
      setNotes(dbNotes);
      setCurrentNoteId(dbNotes[0] && dbNotes[0].id);
    });
  }, []);

  const createNewNote = () => {
    const emptyContent = convertToRaw(
      EditorState.createEmpty().getCurrentContent()
    );
    const newNoteId = makeid(6);
    const newNote = {
      id: newNoteId,
      title: "",
      content: emptyContent,
    };

    setNotes([newNote, ...notes]);
    setCurrentNoteId(newNoteId);
    dbClient.addNote(newNote);
  };

  const updateNote = (id, title, content) => {
    const updatedNote = { id, title, content };
    const newNotes = notes.map((note) => (note.id === id ? updatedNote : note));
    setNotes(newNotes);
    dbClient.updateNote(updatedNote);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => id !== note.id);
    setNotes(newNotes);
    setCurrentNoteId(newNotes[0] && newNotes[0].id);
    dbClient.deleteNote(id);
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        createNewNote,
        updateNote,
        deleteNote,
        currentNoteId,
        setCurrentNoteId,
        setSearchTerm,
        searchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: Types.object,
};

export { Provider, AppContext };
