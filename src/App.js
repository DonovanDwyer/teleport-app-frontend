import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WebcamCont from './WebcamCont'
import BackgroundCont from './BackgroundCont'

class App extends Component {

  fetchBodyOutlineImg = (image) => {
    return fetch("http://localhost:3000/screenshots", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify({image})
    }).then(res => res.json())
  }

  render() {
    return (
      <div>
        <WebcamCont fetchBodyOutlineImg={this.fetchBodyOutlineImg}/>
      </div>
    );
  }
}

export default App;
