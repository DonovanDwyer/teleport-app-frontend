import React, {Component} from 'react';
import Webcam from 'react-webcam'


export default class WebcamComponent extends Component {
  state = {
    imageSrc: "",
    outline: ""
  }

  resetToWebcam = () => {
    this.setState({
      imageSrc: ""
    })
  }

  setRef = webcam => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({imageSrc: imageSrc})
  }

  fetchOutline = () => {
    this.props.fetchBodyOutlineImg(this.state.imageSrc).then(json => this.props.getOutline(json.body_image))
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
      width={799}
      ref={this.setRef}
      height={450}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
    />
    <br />
    <button className="big-button" onClick={this.capture}>Take Picture</button></div>

    let screenshotDiv = <div>
    <img src={this.state.imageSrc} alt="" />
    <p style={{textAlign: 'center'}}>Do you want to save this image?</p>
    <div className="button-div">
    <button onClick={this.fetchOutline} className="med-button">Save Picture</button>
    <button onClick={this.clearImageSrcFromState} className="med-button">Retake Picture</button>
    </div>
    </div>

    let outlineDiv = <div>
      <img src={`data:image/jpeg;base64,${this.state.outline}`} alt="" id="outline" />
    </div>

    if(this.props.resetValue === true || this.state.imageSrc === ""){
      finalDiv = webcamDiv;
    } else if (this.state.imageSrc !== "" && this.state.outline === "") {
      finalDiv = screenshotDiv;
    } else {
      finalDiv = outlineDiv;
    }

    return (
        <div className="handle webcam-container">
          {finalDiv}
        </div>
    )
  }
}
