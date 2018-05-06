import React, { Component } from "react";
import Card from "../../components/Card";
// import LoginForm from "../../components/LoginForm";
import { Col, Row, Container } from "../../components/Grid";
import { ImageCapture } from "../../components/ImageCapture";
import API from "../../utils/API";

class Login extends Component {
  state = {
    lastPhoto: "",
    name: "",
    matchName: "",
    faceId: "",
    imageName: "",
    initialPhoto: "",
    addPicVisibility: 'invisible',
    currentPicVisibility: 'invisible',
    initialPicVisibility: 'invisible'
    };

    setRef = (webcam) => {
      this.webcam = webcam;
    }

    capture = () => {
      this.setState({addPicVisibility: 'invisible', currentPicVisibility: 'invisible', initialPicVisibility: 'invisible'});

      const lastPhoto = this.webcam.getScreenshot();
      this.setState( {lastPhoto});

      API.checkEmployeesImg(
        lastPhoto,
        )
        // .then(res => console.log(res.data))
        .then(res => handleMatchResult(res))
        .catch(err => console.log(err));

      const handleMatchResult = res => {
        console.log(res.data);
        let matchResult = ''
        if (res.data === 'Not recognized') {
          matchResult = 'Not recognized. Please see manager.';
        } else if (res.data.message) {
          matchResult = res.data.message
        } else if (res.data.FaceMatches) {
          API.getCustomer(res.data.FaceMatches[0].Face.FaceId).then(res => handleDisplayData(res.data),
          this.setState({currentPicVisibility: 'visible', initialPicVisibility: 'visible'}),
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
      console.log("Host-addPhoto");
      // const name = this.state.name;
      // this.setState({name});
      console.log('lastPhoto', this.state.lastPhoto);
      console.log('name', this.state.name);
      API.addEmployeesImg( {
        lastPhoto: this.state.lastPhoto,
        name: this.state.name
        }
      )
      .then(res => handlePostCustomer(res))
      .catch(err => console.log(err));

      console.log("image added");

      const handlePostCustomer = res => {
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
          <Row>
            <Col size="md-6">
              <Card title="Login">
              <ImageCapture
              setRef={this.setRef}
              capture={this.capture}
              matchName={this.state.matchName}
              lastPhoto={this.state.lastPhoto}
              initialPhoto={this.state.initialPhoto}
              currentPicVisibility={this.state.currentPicVisibility}
              initialPicVisibility={this.state.initialPicVisibility}
              />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
