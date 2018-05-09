import { Template } from 'meteor/templating';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './main.html';
import WeatherApp from '../imports/client/Weather/WeatherApp.js';

Meteor.startup(() => {
  ReactDOM.render(<WeatherApp />, document.getElementById('weatherInfoContainer'));
});








