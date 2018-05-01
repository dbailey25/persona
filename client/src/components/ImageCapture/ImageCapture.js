import React from "react";
import Webcam from 'react-webcam';

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
    <h5>Match result: {props.matchName}</h5>
    <br />
    <div className={props.currentPicVisibility}>
      <h4>Current Image</h4>
      <img
      src= {props.lastPhoto}
      alt="img" />
    </div>
    <br />
    <div className={props.initialPicVisibility}>
      <h4>Intitial Image</h4>
      <img
      src= {props.initialPhoto}
      alt="img" />
    </div>
  </div>
);
