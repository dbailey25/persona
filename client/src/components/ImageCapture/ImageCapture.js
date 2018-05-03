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
    <button className={`btn btn-primary dropdown-toggle ${props.currentPicVisibility}`} type="button" id="tableAssign" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Table #
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button className="dropdown-item" type="button" value="1">1</button>
      <button className="dropdown-item" type="button" value="2">2</button>
      <button className="dropdown-item" type="button" value="3">3</button>
      <button className="dropdown-item" type="button" value="4">4</button>
      <button className="dropdown-item" type="button" value="5">5</button>
      <button className="dropdown-item" type="button" value="6">6</button>
    </div>
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
