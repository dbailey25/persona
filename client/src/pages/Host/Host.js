import React, { Component } from "react";
import { ImageCapture, AddImage } from "../../components/ImageCapture";
import API from "../../utils/API";
import { Col, Row } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import MenuCard from "../../components/MenuCard";

class Host extends Component {
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
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    this.setState({addPicVisibility: 'invisible', currentPicVisibility: 'invisible', initialPicVisibility: 'invisible'});

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
        matchResult = 'Not recognized';
        this.setState({addPicVisibility: 'visible', currentPicVisibility: 'visible'});
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
    API.addImg( {
      lastPhoto: this.state.lastPhoto,
      name: this.state.name
      }
    )
    .then(res => handlePostCustomer(res))
    .catch(err => console.log(err));

    console.log("image added");

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
         <Row>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#orderModal" onClick={this.getMenuData}>Take Order</button>
        </Row>

        {/* Modal =======================================================================*/}

        <div className="modal fade" id="orderModal" tabIndex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="orderModalLabel">Order for First Name: {this.state.firstName} Last Name: {this.state.lastName}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                

          <Wrapper>
            {/* {this.state.menu
               .map(dishes => (
                <MenuCard
                  key={dishes._id}
                  date={dishes.date}
                  dishName={dishes.dishName}
                  menuSelection={dishes.menuSelection}
                  postOrder={this.postOrder}
              />))} */}
                  
          </Wrapper> 
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={this.handleFormSubmit}>Send Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } // end function, render
} // end class, Host

export default Host;
