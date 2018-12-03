import React, {Component} from 'react';
import Webcam from 'react-webcam'


export default class WebcamCont extends Component {
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
    this.props.fetchBodyOutlineImg(imageSrc).then(json => this.setState({outline: json.body_image}))

  }

  render(){
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div className="workArea">
        < img src='https://wallpapermemory.com/uploads/551/final-fantasy-xiv-ff14-a-realm-reborn-background-hd-1280x768-57204.jpg' alt="" />
        < Webcam
          audio={false}
          width={350}
          ref={this.setRef}
          height={350}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Take Picture</button>
        {this.state.imageSrc === "" ? null : <img src={this.state.imageSrc} alt="" />}
        {this.state.outline === "" ? null : <img src={`data:image/jpeg;base64,${this.state.outline}`} alt="" id="overlayImageTest"/>}
      </div>
    )
  }
}
