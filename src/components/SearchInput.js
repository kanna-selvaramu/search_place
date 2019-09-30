import React, { Component } from 'react';
import Script from 'react-load-script';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
    marginTop: 20
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function CustomizedInput() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        id = "autocomplete"
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      query: '' 
    };
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
  }

  handleScriptLoad() { 
    var options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete functionality
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    ); 
    this.autocomplete.addListener('place_changed', this.props.triggerStoreMethod);
  }
  render() {
    return (
      <div class="InpCont">
        <div className = "InputWrap">
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g&libraries=places"
            onLoad={this.handleScriptLoad}
          />
          <div className="locationWrapper">
            <CustomizedInput />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
