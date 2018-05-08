import React, { Component } from "react";
import { ImageCapture, AddImage } from "../../components/ImageCapture";
import UserName from "../../components/UserName";
// import TableAssign from "../../components/TableAssign";
import API from "../../utils/API";
import { Row } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import TableCard from "../../components/TableCard";

class Host extends Component {
  state = {
      // referrer: '',
      lastPhoto: "",
      name: "",
      matchName: "",
      faceId: "",
      imageName: "",
      initialPhoto: "",
      addPicVisibility: 'invisible',
      currentPicVisibility: 'invisible',
      initialPicVisibility: 'invisible',
      tables: []
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
        this.setState({addPicVisibility: 'visible', currentPicVisibility: 'visible', matchName: matchResult});
      } else if (res.data.message) {
        matchResult = res.data.message
      } else if (res.data.FaceMatches) {
        this.setState({faceId: res.data.FaceMatches[0].Face.FaceId});
        API.getCustomer(res.data.FaceMatches[0].Face.FaceId).then(res => handleDisplayData(res.data),
        this.setState({currentPicVisibility: 'visible', initialPicVisibility: 'visible'}),
        matchResult = res.data.FaceMatches[0].Face.ExternalImageId
      );

       const handleDisplayData = data => (
          this.setState({initialPhoto: data.photo})
           // matchResult = data.FaceMatches[0].Face.ExternalImageId
        )
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
    const handleDisplayData = data => (
      this.setState({initialPhoto: data.photo})
    )
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
 .then(res=>console.log(data))
 .catch(err => console.log(err));
}

  render() {
    return (
      <div>
        <UserName
        userName={this.props.location.state.referrer}/>
        <ImageCapture
        setRef={this.setRef}
        capture={this.capture}
        matchName={this.state.matchName}
        lastPhoto={this.state.lastPhoto}
        initialPhoto={this.state.initialPhoto}
        currentPicVisibility={this.state.currentPicVisibility}
        initialPicVisibility={this.state.initialPicVisibility}
        />
        {/* <TableAssign
        initialPicVisibility={this.state.initialPicVisibility}
        /> */}
        <AddImage
        visibility={this.state.addPicVisibility}
        addPhoto={this.addPhoto}
        handleInputChange={this.handleInputChange}/>
         <Row>
        <button type="button" className={`btn btn-primary ${this.state.initialPicVisibility}`}  data-toggle="modal" data-target="#tableModal" onClick={this.getTableData}>Table</button>
        </Row>

        {/* Modal =======================================================================*/}

        <div className="modal fade" id="tableModal" tabIndex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="orderModalLabel">Tables
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">


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
              <div className="modal-footer">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } // end function, render
} // end class, Host

export default Host;
