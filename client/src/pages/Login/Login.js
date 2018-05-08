import React, { Component } from "react";
import Card from "../../components/Card";
// import LoginForm from "../../components/LoginForm";
import { Col, Row, Container } from "../../components/Grid";
import { ImageCapture, AddImage } from "../../components/ImageCapture";
import API from "../../utils/API";

import { Redirect } from "react-router-dom";
// import Waiter from "../../pages/Waiter";
// import NoMatch from "../../pages/NoMatch";
// import Nav from "../../components/Nav";
// import Footer from "../../components/Footer";
import { Button, ButtonGroup } from 'reactstrap';


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
    authHost: false,
    employeeRole: "",
    };

    setRef = (webcam) => {
      this.webcam = webcam;
    }

    capture = () => {
      console.log("Capture initiated");
      console.log(this.state.employeeRole);
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
        // let userName = '';
        // const roles = ['Host_', 'Waiter_'];
        const enableRedirect = () => {
          (() => {
            // console.log('enableRedirect/matchName', this.state.matchName);
            if (this.state.employeeRole === 'Waiter') {
               this.setState({authWaiter: true})
            }
            else if (this.state.employeeRole === 'Host') {
             this.setState({authHost: true})
            }
          }) ()
          this.setState({redirect: true})
        };

        if (res.data === 'Not recognized') {
          matchResult = 'Not recognized.';
          this.setState({addPicVisibility: 'visible', currentPicVisibility: 'visible', matchName: matchResult})
        } else if (res.data.message) {
          matchResult = res.data.message
          this.setState({matchName: matchResult})
        } else if (res.data.FaceMatches) {
          // userName = res.data.FaceMatches[0].Face.ExternalImageId;
          API.getEmployee(res.data.FaceMatches[0].Face.FaceId).then(res => handleEmployeeDBData(res.data)).then(()=>{
            this.setState({currentPicVisibility: 'visible', initialPicVisibility: 'visible'});
            console.log('role', this.state.employeeRole);
            enableRedirect()
          })

         const handleEmployeeDBData = data => {
           console.log('handleEmployeeDBData', data.role);
            this.setState({initialPhoto: data.photo, matchName: res.data.FaceMatches[0].Face.ExternalImageId, employeeRole: data.role});
          };
        } else {
          matchResult = 'Unexpected result'
        }
     } // end function, handleMatchResult

   }; // end function, capture

    addPhoto = event => {
      event.preventDefault();
      console.log("Host-addPhoto");
      console.log('lastPhoto', this.state.lastPhoto);
      console.log('name', this.state.name);
      API.addEmployeesImg( {
        lastPhoto: this.state.lastPhoto,
        name: this.state.name
        }
      )
      .then(res => handleAddEmployee(res))
      .catch(err => console.log(err));

      const handleAddEmployee = res => {
        console.log(res);
        this.setState({
          faceId: res.data.FaceId,
          imageName: res.data.ExternalImageId,
          });
          API.postEmployee(
            {
              faceId: this.state.faceId,
              name: this.state.imageName,
              photo: this.state.lastPhoto,
              role: this.state.employeeRole
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

    constructor (props) {
      super(props);

      this.state = { cSelected: [] };

      this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    }

    onRadioBtnClick(employeeRole) {
      this.setState({ employeeRole });
    }

  render() {
    const { redirect, matchName } = this.state;
    // const redirect = this.state.redirect;
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
      return <Redirect to = {{
        pathname: nextPage, state: {referrer: matchName}
      }} />;
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
              <AddImage
              visibility={this.state.addPicVisibility}
              addPhoto={this.addPhoto}
              handleInputChange={this.handleInputChange}/>

             <div className={this.state.currentPicVisibility}>
              <h5>Role: </h5>
              <ButtonGroup>
                <Button color="primary" onClick={() => this.onRadioBtnClick("Host")} active={this.state.employeeRole === "Host"}>Host</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick("Waiter")} active={this.state.employeeRole === "Waiter"}>Waiter</Button>
              </ButtonGroup>
              <p>Selected: {this.state.employeeRole}</p>
            </div>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
