import React, { Component } from 'react'; 
import './App.css';
import { Provider } from 'react-redux'; 
import SearchWrap from './components/SearchWrap.js';
import initStore from './store.js';

let store = initStore();

class App extends Component {
  render() {
    return (
      <div className ="searchPageWrap">
        <Provider store={store}>
            <SearchWrap />
        </Provider>
      </div>
    )
  }
}

export default App;
