import React, {Component} from 'react'


export default class Background extends Component {


  render(){
    return (<div>
        <img src={`data:image/jpeg;base64,${this.props.selectedBackgroundImage}`} alt="" className="background-image"  />
        </div>
    )
  }

}
