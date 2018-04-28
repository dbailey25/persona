import React from "react";
import Webcam from 'react-webcam';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import API from "../src/utils/API";
import Form from './components/Form';
import FormGroup from './components/FormGroup';
import Input from './components/Input';
import ButtonRight from './components/ButtonRight';


class WebcamCapture extends React.Component {

    state = {
        lastPhoto: "",
        name: "",
        matchName: "",
        faceId: "",
        imageName: "",
        initialPhoto: ""
    }

    setRef = (webcam) => {
      this.webcam = webcam;
    }

    capture = () => {
      const lastPhoto = this.webcam.getScreenshot();
      this.setState( {lastPhoto});

      // console.log(lastPhoto);

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
          // API.getCustomer(res.data.FaceMatches[0].Face.FaceId)
          API.getCustomer(res.data.FaceMatches[0].Face.FaceId) // hard coded MongoDB _id for a seeded document

          // .then(res => matchResult = res)
          .then(res => handleDisplayData(res.data));

         const handleDisplayData = data => {
            this.setState({initialPhoto: data.photo, matchName: res.data.FaceMatches[0].Face.ExternalImageId})
          }
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
    };

    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    render() {
      return (
      <Router>
        <div>
          <Nav />
          <Form role="form">
            {this.props.children}
          </Form>
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
        </div>
        </Router>
      );
    }
  }


export default WebcamCapture;
