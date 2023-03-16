import styled from 'styled-components';

export const FindSection = styled.div`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const SearchFormBtn = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #bbb7ee;
  opacity: 0.4;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  &&:hover,
  &&:focus {
    opacity: 1;
  }
`;

export const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;

  &&::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;
