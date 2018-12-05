import React, {Component} from 'react'

export default class TextToolbar extends Component {

  state = {
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    text: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    this.props.handleTextFormChanges(e)
  }

  render(){
    return (
      <form>
        Text Content:
        <input type="text" value={this.state.text} name="text" onChange={this.handleChange} />
        Font Size:
        <input type="number" value={this.state.fontSize} name="fontSize" onChange={this.handleChange}/>
        <br />
        Font Family:
        <select name="fontFamily" onChange={this.handleChange}>
          <option value="Calibri">Calibri</option>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="serif">serif</option>
          <option value="sans-serif">sans-serif</option>
        </select>
        <br />
        Font Color:
        <div onChange={(e) => this.handleChange(e)}>
          <input name="fill" type="radio" value="#B22222" /><div style={{height: 10, width: 10, backgroundColor:"#B22222"}}/>
          <input name="fill" type="radio" value="#FF1493" /><div style={{height: 10, width: 10, backgroundColor:"#FF1493"}}/>
          <input name="fill" type="radio" value="#FF8C00" /><div style={{height: 10, width: 10, backgroundColor:"#FF8C00"}}/>
          <input name="fill" type="radio" value="#FFD700" /><div style={{height: 10, width: 10, backgroundColor:"#FFD700"}}/>
          <input name="fill" type="radio" value="#8B008B" /><div style={{height: 10, width: 10, backgroundColor:"#8B008B"}}/>
          <input name="fill" type="radio" value="#0000CD" /><div style={{height: 10, width: 10, backgroundColor:"#0000CD"}}/>
          <input name="fill" type="radio" value="#228B22" /><div style={{height: 10, width: 10, backgroundColor:"#228B22"}}/>
          <input name="fill" type="radio" value="#8B4513" /><div style={{height: 10, width: 10, backgroundColor:"#8B4513"}}/>
          <input name="fill" type="radio" value="#FFFFFF" /><div style={{height: 10, width: 10, backgroundColor:"#FFFFFF"}}/>
          <input name="fill" type="radio" value="#808080" /><div style={{height: 10, width: 10, backgroundColor:"#808080"}}/>
          <input name="fill" type="radio" value="#000000" /><div style={{height: 10, width: 10, backgroundColor:"#000000"}}/>
        </div>
        <br />
      </form>
    )
  }



}
