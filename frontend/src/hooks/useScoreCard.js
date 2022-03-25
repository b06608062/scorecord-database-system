import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const insterionSort = (card, sortType) => {
  const N = card.length
  let i, j, tmp;
  if(sortType==='increase'){
    for(i=1;i<N;i++){
      let s1 = card[i].score;
      tmp = card[i];
      for(j=i;j>0&&s1<card[j-1].score;j--){
        card[j] = card[j-1];
      }
      card[j] = tmp;
    }
  }else{
    for(i=1;i<N;i++){
      let s1 = card[i].score;
      tmp = card[i];
      for(j=i;j>0&&s1>card[j-1].score;j--){
        card[j] = card[j-1];
      }
      card[j] = tmp;
    }
  }
}

const selectionSort = (card, sortType) => {
  const N = card.length
  let i, j, index;
  if(sortType==='increase'){
    for(i=0;i<N-1;i++){
      index = i;
      for(j=i;j<N;j++){
        if(card[index].score>card[j].score){
          index = j;
        }
      }
      [card[i], card[index]] = [card[index], card[i]];
    }  
  }else{
    for(i=0;i<N-1;i++){
      index = i;
      for(j=i+1;j<N;j++){
        if(card[index].score<card[j].score){
          index = j;
        }
      }
      [card[i], card[index]] = [card[index], card[i]];
    }  
  }
}

const bubbleSort = (card, sortType) => {
  const N = card.length
  let i, j, flag;
  if(sortType==='increase'){
    for(i=N-1;i>0;i--){
      flag = false;
      for(j=0;j<i;j++){
        if(card[j].score>card[j+1].score){
          [card[j], card[j+1]] = [card[j+1], card[j]];
          flag = true;
        }
      }
      if(!flag) break;
    }
  }else{
    for(i=0;i<N-1;i++){
      for(j=N-1;j>i;j--){
        if(card[j].score>card[j-1].score){
          [card[j], card[j-1]] = [ card[j-1], card[j]];
          flag = true
        }
      }
      if(!flag) break;
    }
  }
}

const shellSort = (card, sortType) => {
  const N = card.length
  let i, j, tmp, gap;
  gap = parseInt(N/2);
  if(sortType==='increase'){
    for(;gap>0;gap=parseInt(gap/2)){
      for(i=gap;i<N;i++){
        let s1 = card[i].score;
        tmp = card[i]
        for(j=i;j>=gap&&s1<card[j-gap].score;j-=gap){
          card[j] = card[j-gap];
        }
        card[j] = tmp;
      }
    }
  }else{
    for(;gap>0;gap=parseInt(gap/2)){
      for(i=gap;i<N;i++){
        let s1 = card[i].score;
        tmp = card[i]
        for(j=i;j>=gap&&s1>card[j-gap].score;j-=gap){
          card[j] = card[j-gap];
        }
        card[j] = tmp;
      }
    }
  }
}

const shakerSort = (card, sortType) => {
  let left = 0;
  const N = card.length;
  let right = N-1;
  let shift = 0;
  if(sortType==='increase'){
    while(left<right){
      for(let i=0;i<right;i++){
        if(card[i].score>card[i+1].score){
          [card[i], card[i+1]] = [card[i+1], card[i]];
          shift = i;
        }
      }
      right = shift;
      for(let i=right;i>left;i--){
        if(card[i].score<card[i-1].score){
          [card[i], card[i-1]] = [card[i-1], card[i]];
            shift = i;
        }
      }
      left = shift;
    }
  }else{
    while(left<right){
      for(let i=0;i<right;i++){
        if(card[i].score<card[i+1].score){
          [card[i], card[i+1]] = [card[i+1], card[i]];
          shift = i;
        }
      }
      right = shift;
      for(let i=right;i>left;i--){
        if(card[i].score>card[i-1].score){
          [card[i], card[i-1]] = [card[i-1], card[i]];
            shift = i;
        }
      }
      left = shift;
    }
  }
}

const quickSort = (card, sortType, left, right) => {
  if(sortType==='increase'){
    if(left<right){
      const pivot = card[left].score;
      let i = left, j = right+1;
      while(true){
        while(i+1<=right&&card[++i].score<pivot);
        while(card[--j].score>pivot);
  
        if(i>=j) break;
  
        [card[i], card[j]] = [card[j], card[i]];
      }
      [card[left], card[j]] = [card[j], card[left]];
      quickSort(card, sortType, left, j-1);
      quickSort(card, sortType, j+1, right);
    }
  }else{
    if(left<right){
      const pivot = card[left].score;
      let i = left, j = right+1;
      while(true){
        while(i+1<=right&&card[++i].score>pivot);
        while(card[--j].score<pivot);
  
        if(i>=j) break;
  
        [card[i], card[j]] = [card[j], card[i]];
      }
      [card[left], card[j]] = [card[j], card[left]];
      quickSort(card, sortType, left, j-1);
      quickSort(card, sortType, j+1, right);
    }
  }
}

const merge = (card1, card2, sortType) => {
  let mergeCard = [], i = 0, j = 0, shift = 0;
  let l1 = card1.length, l2 = card2.length;
  if(sortType==='increase'){
    while(i<l1&&j<l2){
      mergeCard[shift++] = card1[i].score<card2[j].score?card1[i++]:card2[j++];
    }
  }else{
    while(i<l1&&j<l2){
      mergeCard[shift++] = card1[i].score>card2[j].score?card1[i++]:card2[j++];
    }
  }
  if(i<l1){
    for(;i<l1;i++) mergeCard[shift++] = card1[i];
  }else{
    for(;j<l2;j++) mergeCard[shift++] = card2[j];
  }
  return mergeCard;
}

const mergeSort = (card, sortType) => {
  const N = card.length;
  if(N>1){
    let leftCard = [], rightCard = [];
    const divide = parseInt(N/2);
    for(let i=0;i<divide;i++) leftCard[i] = card[i];
    for(let i=divide;i<N;i++) rightCard[i-divide] = card[i];
    return merge(mergeSort(leftCard, sortType), mergeSort(rightCard, sortType), sortType);
  }
  return card
}

const radixSort = (card, sortType) => {
  const N = card.length;
  let radix = 1, max = 100, index;
  let count = [], buckets = [];
  for(let i=0;i<10;i++){
    buckets.push(new Array(N));
    count[i] = 0;
  }
  while(radix<=max){
    for(let i=0;i<N;i++){
      let LSD = parseInt(card[i].score/radix)%10;
      buckets[LSD][count[LSD]++] = card[i];
    }
    radix*=10;
    index = 0;
    if(sortType==='increase'){
      for(let i=0;i<10;i++){
        let n = 0;
        while(count[i]--){
          card[index++] = buckets[i][n++];
        }
        count[i] = 0;
      }
    }else{
      for(let i=9;i>=0;i--){
        let n = 0;
        while(count[i]--){
          card[index++] = buckets[i][n++];
        }
        count[i] = 0;
      }
    }
  }
}


const ScoreCardContext = createContext({
  addMessages: [],
  queryMessages: [],
  mode: 0,
  table: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  changeMode: () => {},
  clearAllMessage: () => {},
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
  };

  const addRegularMessage = (ms) => {
    mode===0?
    setAddMessages([
      ...addMessages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]):
    setQueryMessages([
      ...queryMessages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ])
  };

  const addErrorMessage = (message) => {
    mode===0?
    setAddMessages([...addMessages, makeMessage(message, ERROR_MESSAGE_COLOR)]):
    setQueryMessages([...queryMessages, makeMessage(message, ERROR_MESSAGE_COLOR)])
  };

  const clearAllMessage = (message) => {
    setAddMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
    setQueryMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
  };

  const changeMode = (mode) => {
    setMode(mode);
  }

  const changeTable = (card, sortType='increase') => {
    // quickSort(card, sortType, 0, card.length-1);
    radixSort(card, sortType);
    setTable([...card]);
    // setTable([...mergeSort(card, sortType)]);
  }

  const reSort = (sortType) =>{
    const newTable = [...table];
    // quickSort(newTable, sortType, 0, newTable.length-1);
    radixSort(newTable, sortType);
    setTable(newTable);
    // setTable([...mergeSort(newTable, sortType)]);
  }

  return (
    <ScoreCardContext.Provider
      value={{
        addMessages,
        queryMessages,
        mode,
        table,
        changeMode,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        clearAllMessage,
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
