import React, { Component } from 'react';
import { connect } from 'react-redux';
import {clearHistory, clearByData} from '../actions/searchActions'
import 'bootstrap/dist/css/bootstrap.min.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import defaultMessages from '../constants/staticText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class SearchResults extends Component { 
  constructor(props) 
  {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(event) {
    const name = event.currentTarget.getAttribute("data-attr");
    this.props.dispatchClearByData(name);

  }
  render() {
    const handleClick = this.handleDelete;
    return (
      <div className = "SearchResultsWrap">
        <div className = "resultsCont">
          <div className = "resultsTitle">
            {defaultMessages.recentSearch}
          </div>
          <List className = "RecentSearchesWrapper">
            {
              this.props.renderResults.map(function(name,index){
                return (
                  <ListItem className = "listElement" key = {index}>
                    <ListItemText primary={name}/>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" data-attr={name} onClick = {handleClick}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }
          </List>
          <div className = "resultsWrapper">
            <div className = "resultsCountCont">
              <span className = "resultsCount">
                {this.props.count}
              </span>
              <span className = "resultsText"> results </span>
            </div>
            <div className = "resetCont" onClick = {this.props.dispatchClearResults}>
              {defaultMessages.resetText}
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
    dispatchClearResults: () => {
      dispatch(clearHistory());
    },
    dispatchClearByData: (val) => {
      dispatch(clearByData(val));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResults)