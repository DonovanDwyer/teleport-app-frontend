import React, {Component} from 'react'
import BackgroundImage from '../Components/BackgroundImage'

export default class SidebarContainer extends Component {

  state = {
    backgroundImages: []
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/background_images")
    .then(res => res.json())
    .then(json => this.setState({backgroundImages: json}))
  }

  render(){
    return (
    <div className="sidebar-container">
      <ul>
        {this.state.backgroundImages.map(bg => < BackgroundImage key={bg.id} fetchBackgroundImage={this.props.fetchBackgroundImage} imgObj={bg} />)}
      </ul>
    </div>
  )
  }

}
