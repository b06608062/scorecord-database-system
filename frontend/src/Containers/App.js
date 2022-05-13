import Header from './Header';
import Body from './Body';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
`;

const Button = styled.button`
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

function App() {
  const { changeMode, changeTable } = useScoreCard();

  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Button onClick={() => {changeMode(0);changeTable([]);}}>ADD</Button>
        <Button onClick={() => {changeMode(1);changeTable([]);}}>QUERY</Button>
        <Header />
        <Body />
      </StyledPaper>
    </Wrapper>
  );
};

export default App;
