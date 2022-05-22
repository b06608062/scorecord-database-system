import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import './Body.css';
import up from '../img/up.png';
import down from '../img/down.png';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Table = styled.table`
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Img = styled.img`
  cursor: pointer;
  height: 20px;
  width: 20px;
`;

const Body = () => {
  const classes = useStyles();
  const { 
    addMessages,
    queryMessages,
    mode,
    table,
    addCardMessage,
    addRegularMessage,
    addErrorMessage,
    changeTable,
    reSort
  } = useScoreCard();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);
  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');
  const [sortType, setSortType] = useState('decrease');

  const handleChange = (func) => (event) => {
    func(event.target.value);
  }

  const handleAdd = async () => {
    try {
      const {
        data: { message, card },
      } = await axios.post('/api/create-card', {
        name,
        subject,
        score,
      });
      addCardMessage(message);
      changeTable(card, sortType);
    } catch (e) {
      alert(e);
      addErrorMessage("Please check that the server has opened");
    };
  }

  const handleQuery = async () => {
    try {
      const {
        data: { messages, message, card },
      } = await axios.get('/api/query-cards', {
        params: {
          type: queryType,
          queryString,
        },
      });
      if (!messages) {
        addErrorMessage(message);
      } else {
        addRegularMessage(messages);
        changeTable(card, sortType);
      }
    } catch (e) {
      alert(e);
      addErrorMessage("Please check that the server has opened");     
    }
  }

  const handleSort = () => {
    let newSortType = sortType === 'increase' ? 'decrease' : 'increase';
    setSortType(newSortType);
    reSort(newSortType);
  }

  const ADD = (
    <Row>
      <TextField
        className={classes.input}
        placeholder="Name"
        value={name}
        onChange={handleChange(setName)}
      />
      <TextField
        className={classes.input}
        placeholder="Subject"
        style={{ width: 240 }}
        value={subject}
        onChange={handleChange(setSubject)}
      />
      <TextField
        className={classes.input}
        placeholder="Score"
        value={score}
        onChange={handleChange(setScore)}
        type="number"
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={!name || !subject}
        onClick={handleAdd}
      >
        Add
      </Button>
    </Row>
  )

  const QUERY = (
    <Row>
      <StyledFormControl>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={queryType}
            onChange={handleChange(setQueryType)}
          >
            <FormControlLabel
              value="name"
              control={<Radio color="primary"/>}
              label="Name"
            />
            <FormControlLabel
              value="subject"
              control={<Radio color="primary"/>}
              label="Subject"
            />
          </RadioGroup>
        </FormControl>
      </StyledFormControl>
      <TextField
        placeholder="Query string..."
        value={queryString}
        onChange={handleChange(setQueryString)}
        style={{ flex: 1 }}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={!queryString}
        onClick={handleQuery}
      >
        Query
      </Button>
    </Row>
  )

  return (
    <Wrapper>
      {mode === 0 ? ADD : QUERY}
      <ContentPaper variant="outlined">
        {mode === 0 ?
        addMessages.map((m, i) => (<Typography variant="body2" key={m + i} style={{ color: m.color }}>{m.message}</Typography>))
        :
        queryMessages.map((m, i) => (<Typography variant="body2" key={m + i} style={{ color: m.color }}>{m.message}</Typography>))
        }
      </ContentPaper>
      <Table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Subject</th>
          <th>Score  <span><Img src={sortType === 'increase' ? down : up} onClick={handleSort}></Img></span></th>
        </tr>
        </thead>
        <tbody>
          {table.map((e, i) => (
            <tr key={i}>
              <td>{e.name}</td>
              <td>{e.subject}</td>
              <td>{e.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Body;
