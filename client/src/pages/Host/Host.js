import React, { Component } from "react";
import CamImage from "../../components/CamImage";
import API from "../../utils/API";
import { Container } from "../../components/Grid";

class Host extends Component {
  state = {
      lastPhoto: "",
      name: "",
      matchName: "",
      faceId: "",
      imageName: "",
      initialPhoto: ""
  }

// change all this. to this.state

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const lastPhoto = this.webcam.getScreenshot();
    this.setState( {lastPhoto});

    API.checkImg(
      lastPhoto,
      )
      // .then(res => console.log(res.data))
      .then(res => handleMatchResult(res))
      .catch(err => console.log(err));

    const handleMatchResult = res => {
      console.log(res.data);
      let matchResult = ''
      if (res.data === 'Not recognized') {
        matchResult = 'Not recognized'
      } else if (res.data.message) {
        matchResult = res.data.message
      } else if (res.data.FaceMatches) {
        API.getCustomer(res.data.FaceMatches[0].Face.FaceId).then(res => handleDisplayData(res.data)
      );

       const handleDisplayData = data => {
          this.setState({initialPhoto: data.photo, matchName: res.data.FaceMatches[0].Face.ExternalImageId})
        }
      } else {
        matchResult = 'Unexpected result'
      }
      this.setState({matchName: matchResult})
   } // end function, handleMatchResult

 }; // end function, capture

  addPhoto = event => {
    event.preventDefault();
    const name = this.state.name;
    this.setState({name});
    API.addImg( {
      lastPhoto: this.state.lastPhoto,
      name: this.state.name
      }
    )
    .then(res => handlePostCustomer(res))
    .catch(err => console.log(err));

    const handlePostCustomer = res => {
      // const image = this.state.lastPhoto.replace("data:image/jpeg;base64,", "");
      // const photo =  Buffer.from(image, 'base64');
      console.log(res.data);
      this.setState({
        faceId: res.data.FaceId,
        imageName: res.data.ExternalImageId
      });
      API.postCustomer(
        {
          faceId: this.state.faceId,
          name: this.state.imageName,
          photo: this.state.lastPhoto
        }
      )
    .then(res => handleDisplayData(res.data))
    .catch(err => console.log(err));
    }
    const handleDisplayData = data => {
      this.setState({initialPhoto: data.photo})
    }
  }; // end function, addPhoto

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <Container>
          <CamImage />

        {/*<Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
        <br />
        <span>Match result: {this.state.matchName}</span>
        <br />
        <br />
        <img src= {this.state.lastPhoto} alt="img" />
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
        <br />
        <img src= {this.state.initialPhoto} alt="img" />
        */}

        </Container>
      </div>
    );
  } // end method, render
} // end class, CaptureImag

export default Host;
