import React, { Component } from "react";
import Card from "../../components/Card";
// import LoginForm from "../../components/LoginForm";
import { Col, Row, Container } from "../../components/Grid";
import { ImageCapture } from "../../components/ImageCapture";
import API from "../../utils/API";

import { Redirect } from "react-router-dom";
// import Waiter from "../../pages/Waiter";
// import NoMatch from "../../pages/NoMatch";
// import Nav from "../../components/Nav";
// import Footer from "../../components/Footer";



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
    initialPicVisibility: 'invisible',
    redirect: false,
    authWaiter: false,
    authHost: false
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
        .then(res => handleMatchResult(res))
        .catch(err => console.log(err));



      const handleMatchResult = res => {
        let matchResult = '';
        let userName = res.data.FaceMatches[0].Face.ExternalImageId;
        const roles = ['Host_', 'Waiter_'];
        const enableRedirect = () => {
          (() => {
            // console.log('enableRedirect/matchName', this.state.matchName);
            if (userName.includes('Waiter_')) {
             this.setState({authWaiter: true})
          }
          else if (userName.includes('Host_')) {
           this.setState({authHost: true})
          }
          }) ()
          this.setState({redirect: true})
        };
          if (res.data === 'Not recognized') {
            matchResult = 'Not recognized. Please see manager.';
            this.setState({matchName: matchResult})
          } else if (res.data.message) {
            matchResult = res.data.message
            this.setState({matchName: matchResult})
          } else if (res.data.FaceMatches) {
            API.getCustomer(res.data.FaceMatches[0].Face.FaceId).then(res => handleDisplayData(res.data),
            this.setState({currentPicVisibility: 'visible', initialPicVisibility: 'visible'}),
            roles.some(element => userName.includes(element))? enableRedirect() : alert("Authentication failed. Please see manager.")
          );
           const handleDisplayData = data => {
              this.setState({initialPhoto: data.photo, matchName: res.data.FaceMatches[0].Face.ExternalImageId});
            };
          } else {
            matchResult = 'Unexpected result'
          }
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

      const handlePostCustomer = res => {
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
    const redirect = this.state.redirect;
    let nextPage = '';
    (() => {
      if (this.state.authWaiter) {
      nextPage = '/waiter'
    }
    else if (this.state.authHost) {
      nextPage = '/host'
    }
    }) ()
    if (redirect) {
      return <Redirect to = {nextPage} />;
    }
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
