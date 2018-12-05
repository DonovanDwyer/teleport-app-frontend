import React, { Component } from 'react';
import './App.css';
import SidebarContainer from './Containers/SidebarContainer'
import WorkAreaContainer from './Containers/WorkAreaContainer'
import SavedImageContainer from './Containers/SavedImageContainer'
import FullScreenImage from './Components/FullScreenImage'
import html2canvas from "html2canvas"

class App extends Component {

  state = {
    selectedBackgroundImage: "",
    finalImage: "",
    fontSize: "18",
    fontFamily: "Calibri",
    fill: "#555",
    text: "",
    textToolbarIsOpen: false
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

  getScreenshot = () => {
    let workArea = document.querySelector(".work-area-container")
    html2canvas(workArea, {allowTaint : true}).then((canvas) => {
    let base64image = canvas.toDataURL("image/png");
    this.setState({finalImage: base64image})
    this.sendImageToDB(base64image)
  })
  }

  sendImageToDB = (base64image) => {
    return fetch("http://localhost:3000/final_images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        image: base64image
      })
    }).then(res => res.json())
  }

  showFinalImage = (image) => {
    this.setState({
      finalImage: image
    })
  }

  closeFullScreen = () => {
    this.setState({
      finalImage: ""
    })
  }

  handleTextFormChanges = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleToolbarValue = (bool) => {
    this.setState({textToolbarIsOpen: bool})
  }

  render() {
    return (
      <div>
      {this.state.finalImage === "" ? null : <FullScreenImage closeFullScreen={this.closeFullScreen} image={this.state.finalImage} />}
      <button onClick={this.getScreenshot} id="butt">Clicker</button>
        < WorkAreaContainer
        selectedBackgroundImage={this.state.selectedBackgroundImage}
        fetchBodyOutlineImg={this.fetchBodyOutlineImg}
        fontSize={this.state.fontSize}
        fontFamily={this.state.fontFamily}
        fill={this.state.fill}
        text={this.state.text}
        textToolbarIsOpen={this.state.textToolbarIsOpen}
        />
        < SidebarContainer
        fetchBackgroundImage={this.fetchBackgroundImage}
        handleTextFormChanges={this.handleTextFormChanges}
        toggleToolbarValue={this.toggleToolbarValue}
        />
        < SavedImageContainer showFinalImage={this.showFinalImage}/>
      </div>
    );
  }
}

export default App;
