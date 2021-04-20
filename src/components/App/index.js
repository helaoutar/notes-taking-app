import React, { useContext } from "react";
import styled from "styled-components";
import { Layout as AntLayout, Button as AntButton, Modal } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { AppContext } from "../../context";
import Notes from "../Notes";
import Editor from "../Editor";
import SearchInput from "../common/SearchInput";
import { BORDER_COLOR, MAIN_COLOR, TEXT_COLOR } from "../../constants";

const { Content: AntContent, Sider: AntSider } = AntLayout;
const { confirm } = Modal;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5% 15px 10%;
  border-bottom: 1px solid ${BORDER_COLOR};
`;

const Layout = styled((props) => <AntLayout {...props} />)`
  height: 100%;
`;

const Sider = styled((props) => <AntSider {...props} />)`
  background-color: ${MAIN_COLOR};
  border-right: 1px solid ${BORDER_COLOR};
  overflow: auto;
`;

const Content = styled((props) => <AntContent {...props} />)`
  background-color: ${MAIN_COLOR};
  padding: 0 20px;
  filter: brightness(1.7);
`;

const Button = styled((props) => <AntButton {...props} />)`
  position: absolute;
  bottom: 25px;
  right: 25px;
  z-index: 100;
`;

const AddNoteButton = styled((props) => <PlusCircleOutlined {...props} />)`
  cursor: pointer;
  color: ${TEXT_COLOR};
  font-size: 25px;
  margin-left: 10px;
`;

const App = () => {
  const {
    setSearchTerm,
    createNewNote,
    currentNoteId,
    deleteNote,
  } = useContext(AppContext);

  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete this note?",
      icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
      onOk() {
        deleteNote(currentNoteId);
      },
    });
  };

  return (
    <Layout>
      <Sider width={300}>
        <SearchContainer>
          <SearchInput onChange={setSearchTerm} />
          <AddNoteButton onClick={createNewNote} />
        </SearchContainer>
        <Notes />
      </Sider>
      <Layout className="site-layout">
        <Content>
          {!!currentNoteId && (
            <>
              <Editor />
              <Button
                onClick={showConfirm}
                type="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                size="large"
              />
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
