import React, {Component} from 'react'

export default class FullScreenImage extends Component {

  render(){
    return (
      <div className="full-screen-image">
        <a href="#" onClick={this.props.closeFullScreen} id="close-button" >✕</a>
        <a href="#" id="delete-button" onClick={this.props.deleteFinalImage}>Delete Image</a>
        <img src={this.props.image.image} alt="" />
      </div>
    )
  }

}
