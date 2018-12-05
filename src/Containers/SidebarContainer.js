import React, {Component} from 'react'
import BackgroundImage from '../Components/BackgroundImage'
import TextToolbar from '../Components/TextToolbar'

export default class SidebarContainer extends Component {

  state = {
    newBackgroundUrl: "",
    sidebarContent: "background"
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

  // addBackgroundtoDB = () => {
  //   let newBackgroundArray = [...this.state.backgroundImages]
  //   fetch("http://localhost:3000/background_images", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accepts': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       image_url: this.state.newBackgroundUrl
  //     })
  //   }).then(res => res.json())
  // }

  render(){
    let editDiv;

    if (this.state.sidebarContent === "background") {
      editDiv = <ul>
        {this.props.backgroundImages.map(bg => < BackgroundImage key={bg.id} fetchBackgroundImage={this.props.fetchBackgroundImage} imgObj={bg} />)}
        <br />
        <span style={{marginLeft: -15}}>Add New Background:</span> <input type="text" value={this.state.newBackgroundUrl} name="url" onChange={this.handleChange} />
        <button onClick={() => this.props.addBackgroundtoDB(this.state.newBackgroundUrl)} className="small-button">Save</button>
      </ul>
    } else if (this.state.sidebarContent === "text") {
      editDiv = < TextToolbar handleTextFormChanges={this.props.handleTextFormChanges} />
    }

    return (
    <div className="sidebar-container">
      <select onChange={this.handleDropDown} style={{marginLeft: 25, position: 'fixed', left: 0}}>
        <option value="background">Select Background Images</option>
        <option value="text">Add Text to Image</option>
      </select>
      {this.props.editModeValue ? ( <div>
        <button style={{'position': 'fixed', 'right': 200, marginTop: -20}} className="small-button" onClick={this.props.resetToWebcam}>Reset</button>
        <button style={{'position': 'fixed', 'right': 20, marginTop: -20}} className="small-button" onClick={this.props.getScreenshot}>Save Final Image</button>
      </div>) : (
         null ) }
        {editDiv}
    </div>
  )
  }

}
