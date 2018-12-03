import React, {Component} from 'react'

export default class Background extends Component {



  render(){
    return (
        <img src={this.props.selectedBackgroundImage} alt="" className="background-image"  />
    )
  }

}
