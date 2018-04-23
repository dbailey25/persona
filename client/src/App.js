import React from "react";
import Webcam from 'react-webcam';
import API from "../src/utils/API";


class WebcamCapture extends React.Component {

    state = {
        imageSrc: "",
        name: ""
    }

    setRef = (webcam) => {
      this.webcam = webcam;
    }
   
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      this.setState( {imageSrc});
      
      // console.log(imageSrc);

      API.checkImg(
        imageSrc,
        )
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    };

    addPhoto = event => {
      event.preventDefault();
      const name = this.state.name;
      this.setState({name});
      API.addImg( {
        imageSrc: this.state.imageSrc,
        name: this.state.name
        }
      )
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    };

    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
   
    render() {
      return (
        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
          />
          <button onClick={this.capture}>Capture photo</button>
          <br />
          <img src= {this.state.imageSrc} alt="img" />
          <br />
          <form>
              <input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name"
              />
               <button onClick={this.addPhoto}>Add photo to Collection</button>
            </form>
         
        </div>
      );
    }
  }
  

export default WebcamCapture;
