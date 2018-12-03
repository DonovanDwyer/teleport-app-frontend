import React, {Component} from 'react';
import Webcam from 'react-webcam'
import Draggable from 'react-draggable';

export default class WebcamComponent extends Component {
  state = {
    imageSrc: "",
    outline: ""
  }

  setRef = webcam => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({imageSrc: imageSrc})
  }

  fetchOutline = () => {
    this.props.fetchBodyOutlineImg(this.state.imageSrc).then(json => this.setState({outline: json.body_image}))
  }

  clearImageSrcFromState = () => {
    this.setState({
      imageSrc: ""
    })
  }

  render(){
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    let finalDiv;

    let webcamDiv = <div>
    < Webcam
      audio={false}
      width={350}
      ref={this.setRef}
      height={350}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
    />
    <button onClick={this.capture}>Take Picture</button></div>

    let screenshotDiv = <div>
    <img src={this.state.imageSrc} alt="" />
    <p>Do you want to save this image?</p>
    <button onClick={this.fetchOutline}>Save Picture</button>
    <button onClick={this.clearImageSrcFromState}>Retake Picture</button>
    </div>

    let outlineDiv = <div>
      <img src={`data:image/jpeg;base64,${this.state.outline}`} alt="" id="outline" />
    </div>

    if(this.state.imageSrc === ""){
      finalDiv = webcamDiv;
    } else if (this.state.imageSrc !== "" && this.state.outline === "") {
      finalDiv = screenshotDiv;
    } else {
      finalDiv = outlineDiv;
    }

    return (
      <Draggable
      axis="both"
      handle=".handle"
      bounds="parent"
      defaultPosition={{x: 0, y: 0}}
      position={null}
      onStart={this.handleStart}
      onDrag={this.handleDrag}
      onStop={this.handleStop}
      >
      <div className="handle webcam-container">
        {finalDiv}
      </div>
      </Draggable>
    )
  }
}
