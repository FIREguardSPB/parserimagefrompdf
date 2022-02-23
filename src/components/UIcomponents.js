import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid;
  border-radius: 10px;

  @media (min-width: 1200px) {
    width: 350px;
    max-width: 100%;
  }

  :before {
    box-sizing: inherit;
  }

  :after {
    content: "";
    display: table;
    clear: both;
  }
`