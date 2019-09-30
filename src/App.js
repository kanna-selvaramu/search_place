import React, { Component } from 'react'; 
import './App.css';
import { Provider } from 'react-redux'; 
import SearchWrap from './components/SearchWrap.js';
import {RECEIVED_DATA, CLEAR_DATA} from './action'

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const intialState = {
  recentSearch : [],
  count : 0
};

function reducer(state = intialState, action) {
  switch (action.type){
    case RECEIVED_DATA:
      const getTime = new Date();
      return {
        ...state,
        recentSearch: [...state.recentSearch, action.payload],
        count: state.count + 1
      }
    case CLEAR_DATA:
      return {
        ...state,
        recentSearch : [],
        count: 0
      }
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

class App extends Component {

  render() {
    return (
    <div class="searchPageWrap">
      <Provider store={store}>
          <SearchWrap />
      </Provider>
    </div>
  )
   
  }
}

export default App;
