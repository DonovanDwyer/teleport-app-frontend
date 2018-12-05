import React, {Component} from 'react'
import WebcamComponent from '../Components/WebcamComponent'
import Background from '../Components/Background'
import CanvasComponent from '../Components/CanvasComponent'


export default class WorkAreaContainer extends Component {

  state = {
    outline: "",
    mouseX: "",
    mouseY: ""
  }

  getOutline = (outlineImage) => {
    this.setState({outline: outlineImage})
  }

  handleClick = (e) => {
    if(this.props.textToolbarIsOpen) {
      this.setState({mouseX: e.clientX, mouseY: e.clientY})
    }
  }



  render(){

    let toggleDiv;

    if(this.state.outline === ""){
      toggleDiv = <WebcamComponent fetchBodyOutlineImg={this.props.fetchBodyOutlineImg} getOutline={this.getOutline} />
    } else {
      toggleDiv = <div onClick={this.handleClick}>
      <CanvasComponent
      outlineImage={this.state.outline}
      screenshot={this.getScreenshot}
      fontSize={this.props.fontSize}
      fontFamily={this.props.fontFamily}
      fill={this.props.fill}
      text={this.props.text}
      mouseX={this.state.mouseX}
      mouseY={this.state.mouseY}
      />
      </div>
    }


    return (
      <div className="work-area-container">
        <Background selectedBackgroundImage={this.props.selectedBackgroundImage} />
        {toggleDiv}
      </div>
    )
  }

}
