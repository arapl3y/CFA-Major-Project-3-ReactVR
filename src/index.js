import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-extras';
import 'babel-polyfill';
import axios from 'axios';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

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
    axios.get(`http://localhost:3000/api/images/${window.location.search}`)
      .then((images) => {
        this.setState({ imageIds: images.data });
        console.log(this.state.imageIds)
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render () {
    console.log(this.state.imageIds);
    return (

        <Scene>
          <a-assets>

            <a-asset-item id="gallery-obj" src="assets/cavanagh.obj"></a-asset-item>
            <a-asset-item id="gallery-mtl" src="assets/cavanagh.mtl"></a-asset-item>

            <img id="van-gogh" alt="starry" src="//upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" />

            {this.state.imageIds.map((image, i) =>
              <img id={`test${i}`} alt="painting" key={i} src={`http://localhost:3000/images/${image._id}`} />
            )}

            <img id="groundTexture" alt="ground" src="//cdn.aframe.io/a-painter/images/floor.jpg" />
            <img id="skyTexture" alt="sky" src="//cdn.aframe.io/a-painter/images/sky.jpg" />
          </a-assets>



          <Entity primitive="a-obj-model" src="#gallery-obj" mtl="#gallery-mtl" />



          <Entity primitive="a-box" position="0 1.5 -4" width="2.5" height="2" depth="0.1" src="#test0" />
          <Entity primitive="a-box" position="-4 1.5 0" rotation="0 90" width="2.5" height="2" depth="0.1" src="#test1" />
          <Entity primitive="a-box" position="4 1.5 0" rotation="0 90" width="2.5" height="2" depth="0.1" src="#test2" />
          <Entity primitive="a-box" position="0 1.5 4" width="2.5" height="2" depth="0.09" src="#test3" />


          { /* <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/> */ }

          <Entity primitive="a-light" type="ambient" color="#333"/>
          <Entity primitive="a-light" type="point" color="#ECE1CD" angle="90" position="0 5 0"/>

          { /* <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/> */}


          <Entity primitive="a-camera">
            <Entity primitive="a-cursor" />
          </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
