import React from "react";
import styled from "styled-components";
import Types from "proptypes";
import { SearchOutlined } from "@ant-design/icons";

import { MAIN_COLOR, TEXT_COLOR } from "../../../constants";

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const Input = styled.input`
  color: ${TEXT_COLOR};
  border: 1px solid ${TEXT_COLOR};
  border-radius: 7px;
  padding: 4px 13px;
  padding-left: 50px;
  background-color: ${MAIN_COLOR};
  width: 100%;
  outline: none;
`;

const SearchIcon = styled((props) => <SearchOutlined {...props} />)`
  color: ${TEXT_COLOR};
  position: absolute;
  left: 12%;
  font-size: 17px;
`;

const SearchInput = ({ onChange }) => {
  return (
    <Container>
      <SearchIcon />
      <Input
        type="text"
        placeholder="Search Notes"
        onInput={(e) => onChange(e.target.value)}
      />
    </Container>
  );
};

SearchInput.defaultProps = {
  onChange: () => {},
};

SearchInput.propTypes = {
  onChange: Types.func,
};

export default SearchInput;
