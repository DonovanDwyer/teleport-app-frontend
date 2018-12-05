import React, {Component} from 'react'



export default class BackgroundImage extends Component {



  render(){
    return (
      <li>
        <img src={`data:image/jpeg;base64,${this.props.imgObj.image_url}`} alt="" onClick={() => this.props.fetchBackgroundImage(this.props.imgObj.image_url)} />
      </li>
    )
  }

}
