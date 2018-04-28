import React from "react";
import Webcam from 'react-webcam';

const CamImage = props => (
  <div>
    <Webcam
      audio={false}
      height={350}
      ref={props.setRef}
      screenshotFormat="image/jpeg"
      width={350}
    />
    <button onClick={props.capture}>Capture photo</button>
    <br />
    <span>Match result: {props.matchName}</span>
    <br />
    <br />
    <img src= {props.lastPhoto} alt="img" />
    <br />
    <form>
        <input
          value={props.name}
          onChange={props.handleInputChange}
          name="name"
          placeholder="Name"
        />
         <button onClick={props.addPhoto}>Add photo to Collection</button>
      </form>
    <br />
    <img src= {props.initialPhoto} alt="img" />
  </div>
);

export default CamImage;
