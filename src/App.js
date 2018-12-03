import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SidebarContainer from './Containers/SidebarContainer'
import WorkAreaContainer from './Containers/WorkAreaContainer'
import SavedImageContainer from './Containers/SavedImageContainer'
import BackgroundCont from './BackgroundCont'

class App extends Component {

  state = {
    selectedBackgroundImage: ""
  }

  fetchBodyOutlineImg = (image) => {
    return fetch("http://localhost:3000/body_outlines", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify({image})
    }).then(res => res.json())
  }

  fetchBackgroundImage = (imageUrl) => {
    this.setState({selectedBackgroundImage: imageUrl})
  }

  render() {
    return (
      <div>
        < WorkAreaContainer selectedBackgroundImage={this.state.selectedBackgroundImage} fetchBodyOutlineImg={this.fetchBodyOutlineImg} />
        < SidebarContainer fetchBackgroundImage={this.fetchBackgroundImage}/>
        < SavedImageContainer />
      </div>
    );
  }
}

export default App;
