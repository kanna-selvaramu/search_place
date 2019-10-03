import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateHistory, clearHistory } from '../actions/searchActions'
import Search from '../components/SearchInput';
import SearchResults from '../components/searchResults';

/* This component is designed to be the wrapper of the Input and Results component */

class SearchWrap extends Component { 
  constructor(props) 
  {
    super(props);
  }
  render() {
    return (
      <div className = "searchCont">
        <Search triggerStoreMethod={this.props.dispatchSearchResults}/>
        <SearchResults />
      </div>        
    )
  }
}

const mapStateToProps = (state) => {
  return {
    renderResults: state.recentSearch,
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSearchResults: () => {
      let location = document.getElementById('autocomplete');
      dispatch(updateHistory(location.value));
      document.getElementById('autocomplete').value = '';
    },
    dispatchClearResults: () => {
      dispatch(clearHistory());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchWrap)
