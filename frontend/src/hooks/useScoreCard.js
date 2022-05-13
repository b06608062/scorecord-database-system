import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const quickSort = (card, sortType, left, right) => {
  if (sortType === 'increase') {
    if (left < right) {
      const pivot = card[left].score;
      let i = left, j = right + 1;
      while (true) {
        while (i + 1 <= right && card[++i].score < pivot);

        while(card[--j].score > pivot);
  
        if(i >= j) break;
  
        [card[i], card[j]] = [card[j], card[i]];
      }

      [card[left], card[j]] = [card[j], card[left]];
      quickSort(card, sortType, left, j - 1);
      quickSort(card, sortType, j + 1, right);
    }
  } else {
    if (left < right) {
      const pivot = card[left].score;
      let i = left, j = right+1;
      while (true) {
        while(i + 1 <= right && card[++i].score > pivot);

        while(card[--j].score < pivot);
  
        if (i >= j) break;
  
        [card[i], card[j]] = [card[j], card[i]];
      }

      [card[left], card[j]] = [card[j], card[left]];
      quickSort(card, sortType, left, j - 1);
      quickSort(card, sortType, j + 1, right);
    }
  }
};

const ScoreCardContext = createContext({
  addMessages: [],
  queryMessages: [],
  mode: 0,
  table: [],
  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  clearAllMessage: () => {},
  changeMode: () => {},
  changeTable: ()=> {},
  reSort: () => {}
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [addMessages, setAddMessages] = useState([]);
  const [queryMessages, setQueryMessages] = useState([]);
  const [mode, setMode] = useState(0);
  const [table, setTable] = useState([]);

  const addCardMessage = (message) => {
    setAddMessages([...addMessages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  }

  const addRegularMessage = (messages) => {
    mode === 0 ? 
    setAddMessages([
      ...addMessages,
      ...messages.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ])
    :
    setQueryMessages([
      ...queryMessages,
      ...messages.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ])
  }

  const addErrorMessage = (message) => {
    mode === 0 ?
    setAddMessages([...addMessages, makeMessage(message, ERROR_MESSAGE_COLOR)])
    :
    setQueryMessages([...queryMessages, makeMessage(message, ERROR_MESSAGE_COLOR)])
  }

  const clearAllMessage = (message) => {
    setAddMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
    setQueryMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
  }

  const changeMode = (mode) => {
    setMode(mode);
  }

  const changeTable = (card, sortType='increase') => {
    quickSort(card, sortType, 0, card.length - 1);
    setTable([...card]);
  }

  const reSort = (sortType) => {
    const newTable = [...table];
    quickSort(newTable, sortType, 0, newTable.length - 1);
    setTable(newTable);
  }

  return (
    <ScoreCardContext.Provider
      value={{
        addMessages,
        queryMessages,
        mode,
        table,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        clearAllMessage,
        changeMode,
        changeTable,
        reSort
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
};

export { ScoreCardProvider, useScoreCard };
