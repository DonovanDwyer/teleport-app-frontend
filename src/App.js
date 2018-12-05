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
    textToolbarIsOpen: false,
    editMode: false,
    reset: false,
    finalImages: [],
    backgroundImages: []
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/final_images")
    .then(res => res.json())
    .then(json => this.setState({finalImages: json}));
    this.getBackgroundImages();
  }

  getBackgroundImages = () => {
    return fetch("http://localhost:3000/background_images")
    .then(res => res.json())
    .then(json => this.setState({backgroundImages: json}))
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
    this.sendImageToDB(base64image).then(json => this.setState({
      finalImages: [json, ...this.state.finalImages]
    }))
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

  editMode = (bool) => {
    if(this.state.editMode !== bool){
    this.setState({
      editMode: bool,
      reset: false
    })
    }
  }

  resetToWebcam = () => {
    this.setState({
      editMode: false,
      reset: true
    })
  }

  deleteFinalImage = () => {
    let finalImage = this.state.finalImage
    fetch(`http://localhost:3000/final_images/${finalImage.id}`, {
      method: 'DELETE'
    })
    this.closeFullScreen();
  }

  addBackgroundtoDB = (e) => {
    fetch("http://localhost:3000/background_images", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        image_url: e
      })
    }).then(res => res.json())
  }



  render() {
    return (
      <div>
      {this.state.finalImage === "" ? null : <FullScreenImage closeFullScreen={this.closeFullScreen} image={this.state.finalImage} deleteFinalImage={this.deleteFinalImage} />}
        < WorkAreaContainer
        selectedBackgroundImage={this.state.selectedBackgroundImage}
        fetchBodyOutlineImg={this.fetchBodyOutlineImg}
        fontSize={this.state.fontSize}
        fontFamily={this.state.fontFamily}
        fill={this.state.fill}
        text={this.state.text}
        textToolbarIsOpen={this.state.textToolbarIsOpen}
        editMode={this.editMode}
        resetValue={this.state.reset}
        />
        < SidebarContainer
        backgroundImages={this.state.backgroundImages}
        addBackgroundtoDB={this.addBackgroundtoDB}
        fetchBackgroundImage={this.fetchBackgroundImage}
        handleTextFormChanges={this.handleTextFormChanges}
        toggleToolbarValue={this.toggleToolbarValue}
        editModeValue={this.state.editMode}
        getScreenshot={this.getScreenshot}
        />
        < SavedImageContainer showFinalImage={this.showFinalImage} finalImages={this.state.finalImages} className="final-image-drawer"/>
      </div>
    );
  }
}

export default App;
