import React from "react";
import Webcam from 'react-webcam';
import API from "../src/utils/API";


class WebcamCapture extends React.Component {

    state = {
        imageSrc: "",
        name: "",
        matchName: "",
        faceId: "",
        imageName: "",
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
          // API.getCustomer(res.data.FaceMatches[0].Face.FaceId)
          API.getCustomer(res.data.FaceMatches[0].Face.FaceId) // hard coded MongoDB _id for a seeded document

          // .then(res => matchResult = res)
          .then(res => console.log(res))
        } else {
          matchResult = 'Unexpected result'
        }
        this.setState({matchName: matchResult})
      }

      // const handleMatchResult = res => {
      //   console.log(res.data);
      //   let matchResult = setMatchStatement(res);
      //   this.setState({matchName: matchResult});
      // };
      //
      // const setMatchStatement = res  => {
      //   return (res.data === 'Not recognized') ? 'Not recognized'
      //         :(res.data.message)              ? res.data.message
      //         :(res.data.FaceMatches)          ? res.data.FaceMatches[0].Face.ExternalImageId
      //         :                                  'No image'
      // }

     
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
      .then(res => handlePostCustomer(res))
      .catch(err => console.log(err));

      const handlePostCustomer = res => {
        console.log(res.data);
        this.setState({
          faceId: res.data.FaceId,
          imageName: res.data.ExternalImageId
        });
        API.postCustomer(
          {
            faceId: this.state.faceId,
            name: this.state.imageName
          }
        )
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
      }
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
          <span>Match result: {this.state.matchName}</span>
          <br />
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
