import React, {Component} from 'react'
import BackgroundImage from '../Components/BackgroundImage'
import TextToolbar from '../Components/TextToolbar'

export default class SidebarContainer extends Component {

  state = {
    backgroundImages: [],
    newBackgroundUrl: "",
    sidebarContent: "background"
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/background_images")
    .then(res => res.json())
    .then(json => this.setState({backgroundImages: json}))
  }

  handleDropDown = (e) => {
    this.setState({
      sidebarContent: e.target.value
    })
    e.target.value === "text" ? this.props.toggleToolbarValue(true) : this.props.toggleToolbarValue(false)
  }

  handleChange = e => {
    this.setState({
      newBackgroundUrl: e.target.value
    })
  }

  addBackgroundtoDB = () => {
    let newBackgroundArray = [...this.state.backgroundImages]
    fetch("http://localhost:3000/background_images", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        image_url: this.state.newBackgroundUrl
      })
    }).then(res => res.json())
    .then(json => this.setState({
      backgroundImages: newBackgroundArray.push(json)
    }))
  }

  render(){
    let editDiv;

    if (this.state.sidebarContent === "background") {
      editDiv = <ul>
        {this.state.backgroundImages.map(bg => < BackgroundImage key={bg.id} fetchBackgroundImage={this.props.fetchBackgroundImage} imgObj={bg} />)}
        <br />
        Add New Background: <input type="text" value={this.state.newBackgroundUrl} name="url" onChange={this.handleChange} />
        <button onClick={this.addBackgroundtoDB}>Save</button>
      </ul>
    } else if (this.state.sidebarContent === "text") {
      editDiv = < TextToolbar handleTextFormChanges={this.props.handleTextFormChanges} />
    }

    return (
    <div className="sidebar-container">
      <select onChange={this.handleDropDown}>
        <option value="background">Select Background Images</option>
        <option value="text">Add Text to Image</option>
      </select>
        {editDiv}
    </div>
  )
  }

}
