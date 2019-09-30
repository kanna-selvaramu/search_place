import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateHistory,clearHistory} from '../action'
import Search from '../components/SearchInput'; 
import { ListGroup, ListGroupItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const storeResults = []

class SearchWrap extends Component { 
  constructor(props) 
  {
    super(props);
  }
  render() {
  return (
      <div className = "searchCont">
          <Search triggerStoreMethod={this.props.dispatchSearchResults}/>
          <div class = "SearchResultsWrap">
            <div class = "resultsCont">
              <div class = "resultsTitle">
                Recent Searches
              </div>
              <ListGroup className = "RecentSearchesWrapper">
                {
                  this.props.renderResults.map(function(name,index){
                    return <ListGroupItem  className = "recentSearchLi" key = {index}> {name} </ListGroupItem>
                  })
                }
              </ListGroup>
              <div className = "resultsWrapper">
                <div className = "resultsCountCont">
                  <span className = "resultsCount">
                    {this.props.count}
                  </span>
                  <span className = "resultsText"> results </span>
                </div>
                <div className = "resetCont" onClick = {this.props.dispatchClearResults}>
                  RESET
                </div>
              </div>
            </div>
          </div>
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