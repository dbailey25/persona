import React from "react";
import Webcam from 'react-webcam';
import API from "../src/utils/API";


class WebcamCapture extends React.Component {

    state = {
        imageSrc: ""
    }

    setRef = (webcam) => {
      this.webcam = webcam;
    }
   
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      this.setState( {imageSrc});
      // console.log(imageSrc);

      API.checkImg(
       imageSrc
       )
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
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
        </div>
      );
    }
  }
  

export default WebcamCapture;
