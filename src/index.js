import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-extras';
import 'babel-polyfill';
import axios from 'axios';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

const origin = window.location.port
  ? "http://localhost:3000"
  : "//mighty-thicket-40847.herokuapp.com";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIds: []
    };
  }

  componentDidMount() {
    this.getImageIds()
  }

  getImageIds() {
    axios.get(`${origin}/api/images/${window.location.search}`)
      .then((images) => {
        this.setState({ imageIds: images.data });
        console.log(this.state.imageIds)
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render () {


    return (

        <Scene>
          <a-assets>

            <a-asset-item id="gallery-obj" src="assets/cavanagh.obj"></a-asset-item>
            <a-asset-item id="gallery-mtl" src="assets/cavanagh.mtl"></a-asset-item>


            {this.state.imageIds.map((image, i) =>
              <img id={`image${i}`} alt="painting" key={i} src={`${origin}/images/${image.id}`} />
            )}

            <img id="groundTexture" alt="ground" src="/assets/floor.jpg" />
            <img id="skyTexture" alt="sky" src="/assets/sky.jpg" />
          </a-assets>



          <Entity primitive="a-obj-model" src="#gallery-obj" mtl="#gallery-mtl" />


          <Entity primitive="a-box" position="0 1.5 -4" width="2.5" height="2" depth="0.1" src="#image0" />
          <Entity primitive="a-box" position="-4 1.5 0" rotation="0 90" width="2.5" height="2" depth="0.1" src="#image1" />
          <Entity primitive="a-box" position="4 1.5 0" rotation="0 90" width="2.5" height="2" depth="0.1" src="#image2" />
          <Entity primitive="a-box" position="0 1.5 4" width="2.5" height="2" depth="0.09" src="#image3" />


          <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>

          <Entity primitive="a-light" type="ambient" color="#333"/>
          <Entity primitive="a-light" type="point" color="#ECE1CD" angle="90" position="0 5 0"/>

          <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>


          <Entity primitive="a-camera">
            <Entity primitive="a-cursor" />
          </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
