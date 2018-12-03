import React, {Component} from 'react'
import WebcamComponent from '../Components/WebcamComponent'
import Background from '../Components/Background'

export default class WorkAreaContainer extends Component {

  render(){
    return (
      <div className="work-area-container">
      <Background selectedBackgroundImage={this.props.selectedBackgroundImage} />
      <WebcamComponent fetchBodyOutlineImg={this.props.fetchBodyOutlineImg}/>
      </div>
    )
  }

}
