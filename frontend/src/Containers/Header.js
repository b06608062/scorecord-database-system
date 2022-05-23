import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
  const { addErrorMessage, clearAllMessage, changeTable } = useScoreCard();

  const handleClear = async () => {
    try {
      const {
        data: { message, isFailed },
      } = await axios.delete('/api/clear-db');
      if (isFailed) {
        addErrorMessage(message);
      } else {
        clearAllMessage(message);
        changeTable([]);
      };
    } catch (e) {
      alert(e);
      addErrorMessage("Please check that the server has opened");
    };
  }

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

export default Header;
