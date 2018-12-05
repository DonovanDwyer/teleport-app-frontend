import React, {Component} from 'react'

export default class FullScreenImage extends Component {

  render(){
    return (
      <div className="full-screen-image">
        <a href="#" onClick={this.props.closeFullScreen} >Close this Screen</a>
        <img src={this.props.image} alt="" />
      </div>
    )
  }

}
