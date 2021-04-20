import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Editor as ReactDraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { AppContext } from "../../context";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { MAIN_COLOR, TEXT_COLOR } from "../../constants";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .toolbarClassName {
    background-color: ${MAIN_COLOR} !important;
    border: none !important;
    border-bottom: 1px solid gray !important;
  }

  .editorClassName {
    color: white !important;
    height: calc(100% - 47px) !important;
  }

  .wrapperClassName {
    flex: 1;
    overflow: auto;
  }

  .rdw-option-wrapper {
    background-color: ${MAIN_COLOR} !important;
    border: none !important;
    color: white !important;
  }

  .rdw-option-active,
  .rdw-option-wrapper:hover {
    box-shadow: 0 0 1px #fff !important;
  }
`;

const TitleInput = styled.input`
  background-color: ${MAIN_COLOR};
  border: none;
  margin-bottom: 20px;
  margin-top: 15px;
  font-size: 25px;
  color: ${TEXT_COLOR};
  outline: none;
`;

const Editor = () => {
  const { notes, currentNoteId, updateNote } = useContext(AppContext);
  const [editorState, setEditorState] = useState();
  const titleRef = useRef();

  const currentNote = notes.find(({ id }) => currentNoteId === id) || {};

  useEffect(() => {
    if (currentNote.content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(currentNote.content))
      );
    }
  }, [currentNoteId, notes.length]);

  const changeTitle = (e) => {
    const {
      target: { value: title },
    } = e;
    updateNote(currentNoteId, title, currentNote.content);
  };

  const onStateChange = (state) => {
    setEditorState(state);
    updateNote(
      currentNoteId,
      currentNote.title,
      convertToRaw(state.getCurrentContent())
    );
  };

  return (
    <Container>
      <TitleInput
        ref={titleRef}
        placeholder="Untitled"
        value={currentNote.title}
        onChange={changeTitle}
      />
      <ReactDraftEditor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        optionClassName="optionClassName"
        onEditorStateChange={onStateChange}
        toolbar={{
          options: ["inline", "list", "textAlign", "history", "remove"],
          list: {
            options: ["unordered", "ordered"],
          },
        }}
      />
    </Container>
  );
};

export default Editor;
