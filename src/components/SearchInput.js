import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { loadScriptURL } from '../constants/scriptURL';
import defaultMessages from '../constants/staticText';

class Search extends Component {
  googleMapRef = React.createRef()
  constructor(props) {
    super(props);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = loadScriptURL.initScript;
    script.async = true;
    script.onload = () => this.handleScriptLoad();
    document.body.appendChild(script);
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
    this.autocomplete.addListener('place_changed',this.props.triggerStoreMethod);
    this.googleMap = this.createGoogleMap();
    this.marker = this.createMarker();  
  }
  
  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: -33.8688,
        lng: 151.2195,
      },
      disableDefaultUI: true,
  })

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: -33.8688, lng: 151.2195 },
      map: this.googleMap,
  })

  render() {
    return (
      <div className = "InpMapWrap">
        <div className="InpCont">
          <div className = "InputWrap">
            <div className="locationWrapper">
              <Paper className="root">
                <IconButton className="iconButton" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <InputBase className="input" id = "autocomplete" placeholder= {defaultMessages.searchPlaces} inputProps={{ 'aria-label': defaultMessages.searchPlaces }}/>
                <IconButton className="iconButton" aria-label="search">
                  <SearchIcon />
                </IconButton>
                <Divider className="divider" orientation="vertical" />
                <IconButton color="primary" className="iconButton" aria-label="directions">
                  <DirectionsIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
        </div>
        <div className = "Map_Wrapper">
          <div className = "map_cont" id="google-map" ref={this.googleMapRef}></div>
        </div>
      </div>
    );
  }
}

export default Search;
