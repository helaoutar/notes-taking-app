import React, { useContext } from "react";
import styled from "styled-components";
import { BORDER_COLOR, NOTE_COLOR, NOTE_TEXT_COLOR } from "../../constants";
import { AppContext } from "../../context";

const Container = styled.ul`
  padding: 0;
`;

const Note = styled.li`
  background-color: ${NOTE_COLOR};
  cursor: pointer;
  color: ${NOTE_TEXT_COLOR};
  display: flex;
  min-height: 90px;
  max-height: 90px;
  border-bottom: 1px solid ${BORDER_COLOR};
  padding: 10px 20px;
  flex-direction: column;
  ${(props) =>
    props.selected
      ? `
  filter: brightness(130%)
  `
      : ""}
`;

const NoteTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  height: 25px;
`;

const NoteContent = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const getNoteContent = (content) => {
  if (content.blocks) {
    const block = content.blocks.find(({ text }) => text && text.trim());
    return block && block.text;
  }
  return "";
};

const Notes = () => {
  const { notes, setCurrentNoteId, currentNoteId, searchTerm } = useContext(
    AppContext
  );

  const filteredNotes = notes.filter(({ title, content }) => {
    if (title.match(searchTerm)) {
      return true;
    }

    if (
      content.blocks &&
      content.blocks.some(({ text }) => text.match(searchTerm))
    ) {
      return true;
    }

    return false;
  });

  return filteredNotes.length ? (
    <Container>
      {filteredNotes.map(({ id, title, content }) => (
        <Note
          key={id}
          onClick={() => setCurrentNoteId(id)}
          selected={id === currentNoteId}
        >
          <NoteTitle>{title || "Untitled"}</NoteTitle>
          <NoteContent>{getNoteContent(content)}</NoteContent>
        </Note>
      ))}
    </Container>
  ) : null;
};

export default Notes;
