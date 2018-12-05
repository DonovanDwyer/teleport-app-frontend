import React, {Component} from 'react'
import RKon from 'react-konva';

class Handler extends React.Component {
  componentDidMount() {
    const stage = this.transformer.getStage();
    const imageEdit = stage.findOne(".editimage");
    this.transformer.attachTo(imageEdit);
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <RKon.Transformer
        ref={node => {
          this.transformer = node;
        }}
      />
    );
  }
}

export default class CanvasComponent extends Component {

  state = {
    showTransform: false
  }

  toggleTransformer = () => {
    this.setState({showTransform: !this.state.showTransform})
  }

  render(){
    const image = new window.Image();
    image.src = `data:image/jpeg;base64,${this.props.outlineImage}`

    const backgroundImage = new window.Image();
    backgroundImage.src = this.props.backgroundImage

    let transformer;

    if(this.state.showTransform){
      transformer = <Handler />
    }

    return(<div>
      <RKon.Stage width={window.innerWidth} height={600} ref="stageIt">
        <RKon.Layer>
          {transformer}
          <RKon.Image image={image} draggable name="editimage" onClick={this.toggleTransformer} />
          <RKon.Text
            x={this.props.mouseX}
            y={this.props.mouseY}
            text={this.props.text}
            fontSize={this.props.fontSize}
            fontFamily={this.props.fontFamily}
            fill={this.props.fill}
            width={300}
            padding={20}
            align='left'
          />
        </RKon.Layer>
      </RKon.Stage>
      </div>
    )
  }
}
