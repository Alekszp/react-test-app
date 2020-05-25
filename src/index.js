import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'

function userList(state = [], action){
  if(action.type === 'ADD_USER'){
    return [
      ...state,
      action.payload
    ]
  }
  return state
}
const store = createStore(userList)

store.subscribe(()=>{
  console.log('subscribe', store.getState())
})

store.dispatch({type: 'ADD_USER', payload: {name: 'Nik', id: 2, email: 'nik@mail.com'}})
store.dispatch({type: 'ADD_USER', payload: {name: 'Tod', id: 3, email: 'tod@mail.com'}})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

