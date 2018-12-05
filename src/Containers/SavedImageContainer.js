import React, {Component} from 'react'
import FinalImage from '../Components/FinalImage'

export default class SavedImageContainer extends Component {


  render(){
    let arrayOfImages = this.props.finalImages.map(img => <FinalImage key={img.id} finalImage={img} showFinalImage={this.props.showFinalImage} /> )
    return <div className="final-images-container">{arrayOfImages}</div>
  }

}
