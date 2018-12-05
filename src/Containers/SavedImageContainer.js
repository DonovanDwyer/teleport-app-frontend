import React, {Component} from 'react'
import FinalImage from '../Components/FinalImage'

export default class SavedImageContainer extends Component {

  state = {
    finalImages: []
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/final_images")
    .then(res => res.json())
    .then(json => this.setState({finalImages: json}))
  }

  render(){
    let arrayOfImages = this.state.finalImages.map(img => <FinalImage key={img.id} finalImage={img} showFinalImage={this.props.showFinalImage} /> )
    return <div className="final-images-container">{arrayOfImages}</div>
  }

}
