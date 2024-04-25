// CounterState.js
import { atom } from 'recoil';

// Create an atom (similar to a React state)
export const authAtom= atom({
  key: 'authAtom',
  default: (JSON.parse(localStorage.getItem("chat-user")) || null)
});
export const loginAtom= atom({
  key: 'loginAtom',
  default:{
    username:"",
    password:"",
  },
});

export const searchAtom=atom({
  key: 'searchAtom',
  default:""
});

export const ConversationListAtom=atom({
  key: 'ConversationListAtom',
  default:[],
});
export const isSelectedConversationAtom=atom({
  key: 'isSelectedConversationAtom',
  default:null,
});
export const messageInputAtom=atom({
  key: 'messageInputAtom',
  default:"",
});
export const allMesssagesAtom=atom({
  key: 'allMessagesAtom',
  default:[],
});

