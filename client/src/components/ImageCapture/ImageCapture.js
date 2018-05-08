import React from "react";
import Webcam from 'react-webcam';
// import 'bulma/css/bulma.css'

export const ImageCapture = props => (
  <div>
    <Webcam
      audio={false}
      height={350}
      ref={props.setRef}
      screenshotFormat="image/jpeg"
      width={350}
    />
    <br />
    <button
    type="submit"
    className="btn btn-lg btn-primary"
    onClick={props.capture}>
    Capture photo
    </button>
  </div>
);
