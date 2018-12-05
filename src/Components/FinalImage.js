import React, {Component} from 'react'

export default class FinalImage extends Component {



  render(){
    return(
      <img src={this.props.finalImage.image} alt="" onClick={(image) => this.props.showFinalImage(this.props.finalImage.image)} />
    )
  }

}
