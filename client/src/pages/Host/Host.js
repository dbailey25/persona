import React, { Component } from "react";
import { ImageCapture, AddImage } from "../../components/ImageCapture";
import UserName from "../../components/UserName";
// import TableAssign from "../../components/TableAssign";
import API from "../../utils/API";
// import { Row } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import TableCard from "../../components/TableCard";
import { show } from "bootstrap";
import $ from "jquery";
import { Container } from "../../components/Grid";
import Card from "../../components/Card";
import "./Host.css"

class Host extends Component {
  state = {
      lastPhoto: "",
      name: "",
      matchName: "",
      faceId: "",
      imageName: "",
      initialPhoto: "",
      addConfirm: "",
      addPicVisibility: 'invisible',
      currentPicVisibility: 'invisible',
      initialPicVisibility: 'invisible',
      tablebuttonVisibility: false,
      tables: []
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    this.setState({addPicVisibility: 'invisible', currentPicVisibility: 'invisible', initialPicVisibility: 'invisible', tablebuttonVisibility: false});

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
        this.setState({addPicVisibility: 'visible', currentPicVisibility: 'visible', matchName: matchResult});
        $('#addGuestModal').modal(show)
      } else if (res.data.message) {
        matchResult = res.data.message
        this.setState({matchName: matchResult})
        $('#message').html(`<h4>${this.state.matchName}</h4>`)
      } else if (res.data.FaceMatches) {
        this.setState({faceId: res.data.FaceMatches[0].Face.FaceId});
        API.getCustomer(res.data.FaceMatches[0].Face.FaceId).then(res => handleDisplayData(res.data),
        // this.setState({currentPicVisibility: 'visible', initialPicVisibility: 'visible', tablebuttonVisibility: true}),
        // matchResult = res.data.FaceMatches[0].Face.ExternalImageId,
        console.log('initialPhoto', this.state.initialPhoto),
        $('#priorGuestModal').modal(show)
        )

       const handleDisplayData = data => {
          this.setState({initialPhoto: data.photo});
           matchResult = data.name;
           this.setState({matchName: matchResult});
           // $('#message').html(`<div>
           //   <h4>Guest name: ${matchResult}</h4>
           //   <img
           //   src= "${this.state.initialPhoto}"
           //   alt="img" />
           // </div>
           // `)
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
      this.setState({initialPhoto: data.photo, tablebuttonVisibility: true, addConfirm: "Guest added!"});
    }
  }; // end function, addPhoto

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getTableData = () => {
   API.getTablesData()
   .then(res => this.handleTableData(res.data))
   .catch(err => console.log(err));
  }

  handleTableData = data => {
    console.log(data);
    for (let value of data){
      if(value.tableAvailability === "available"){
        value.tableImg = "/images/table.png";
     };
     this.setState({tables: data});
  }
  console.log(this.state.tables);
}

handleDataTable = (id, data) =>{
    console.log (this.state.faceId);
 API.putTable(id, {
  tableNumber: data.tableNumber,
  tableAvailability: "occupied",
  customerId: this.state.faceId,
  tableImg: this.state.initialPhoto,
  customerName: this.state.matchName,
 })
 // .then(res=>console.log(data))
 .then(this.getTableData())
 .catch(err => console.log(err));
}

  render() {
    return (
      <div>
        <Container className='font'>
        <div className='title-bar-pers'>
          <h3>Host Page</h3>
          <UserName
          userName={this.props.location.state.referrer}/>
        </div>
          <Card title="Capture Guest Image">
          <ImageCapture
          setRef={this.setRef}
          capture={this.capture}
          matchName={this.state.matchName}
          lastPhoto={this.state.lastPhoto}
          initialPhoto={this.state.initialPhoto}
          />
          <div id='message'></div>
          </Card>
         </Container>

        {/* Assign Table Modal ===================================================*/}

        <div className="modal fade" id="tableModal" tabIndex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header modal-header-pers">
                <h5 className="modal-title" id="orderModalLabel">Tables
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body modl-body">


          <Wrapper>
          {this.state.tables
               .map(table => (
                <TableCard
                  key={table._id}
                  date={table.date}
                  tableNumber={table.tableNumber}
                  tableImg={table.tableImg}
                  tableAvailability={table.tableAvailability}
                  customerId={table.customerId}
                  customerName={table.customerName}
                  handleDataTable={this.handleDataTable}
              />))}

          </Wrapper>

              </div>
              <div className=" text-center">
              <button type="button" class="btn button" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* Prior Guest Modal ==================================================*/}

        <div id="priorGuestModal" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header modal-header-pers">
                <h3 className="modal-title">Prior Guest</h3>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body modl-body">
              <h4>Guest Name: {this.state.matchName}</h4>
                <h5>Initial Image</h5>
                <div >
                <img className="centered"
                src= {this.state.initialPhoto}
                alt="img" />
                </div>
              <div className="text-center">
               <button type="button" className="btn button " data-toggle="modal" data-target="#tableModal" data-dismiss="modal" onClick={this.getTableData}>Assign Table</button>
               </div>

              </div>

            </div>
          </div>
        </div>

        {/* Add Guest Modal ==================================================*/}

        <div id="addGuestModal" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header modal-header-pers">
                <h5 className="modal-title">Add New Guest</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body modl-body">
                <img
                src= {this.state.lastPhoto}
                alt="img" />
              <br />
              <AddImage
              addPhoto={this.addPhoto}
              addConfirm={this.state.addConfirm}
              handleInputChange={this.handleInputChange}/>
              {
                 this.state.tablebuttonVisibility &&
                 <div className="text-center">
                  <button type="button" className="btn button " data-toggle="modal" data-target="#tableModal" data-dismiss="modal" onClick={this.getTableData}>Assign Table</button>
                </div>
               }

              </div>

            </div>
          </div>
        </div>
      </div>
    );
  } // end function, render
} // end class, Host

export default Host;
