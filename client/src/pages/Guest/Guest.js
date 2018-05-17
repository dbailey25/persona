import React, { Component } from "react";
// import { Col, Row } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import { BulkMenuCard } from "../../components/MenuCard";
import "./Guest.css"
import API from "../../utils/API";
import { ImageCapture, AddImage } from "../../components/ImageCapture";
import { Col, Row, Container } from "../../components/Grid";
import Card from "../../components/Card";
import { show } from "bootstrap";

import $ from "jquery";

class Guest extends Component {
  state = {
    lastPhoto: "",
    name: "",
    matchName: "",
    faceId: "",
    imageName: "",
    displayCurrentImage: false,
    addConfirm: "",
    custName: "N/A",
    orderButtonVisibility: false,
    menu: [],
    beer: 0,
    wine: 0,
    tea: 0,
    cala: 0,
    wing: 0,
    sald: 0,
    chkn: 0,
    beef: 0,
    fish: 0,
    past: 0,
    pota: 0,
    rice: 0,
    carr: 0,
    broc: 0,
    sprt: 0,
    cake: 0,
    icrm: 0,
    ccke: 0
    // tables: [],
    // orders: [],
    // check: []
    };

    // componentDidMount() {
    //   console.log(this.state.menu);
    //   this.getMenuData()
    //
    // };

    setRef = (webcam) => {
      this.webcam = webcam;
    }

    capture = () => {
      this.setState({orderButtonVisibility: false, addConfirm: ""});

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
          this.setState({displayCurrentImage: true, matchName: matchResult});
          $('#addGuestModal').modal(show)
        } else if (res.data.message) {
          matchResult = res.data.message
          this.setState({matchName: matchResult})
          $('#message').html(`<h4>${this.state.matchName}</h4>`)
        } else if (res.data.FaceMatches) {
          this.setState({faceId: res.data.FaceMatches[0].Face.FaceId});
          API.getCustomer(res.data.FaceMatches[0].Face.FaceId).then(res => handleGetData(res.data),
          this.setState({currentPicVisibility: 'visible', initialPicVisibility: 'visible', tablebuttonVisibility: true}),
          // matchResult = res.data.FaceMatches[0].Face.ExternalImageId,
          )

         const handleGetData = data => {
            this.setState({initialPhoto: data.photo});
             matchResult = data.name;
             $('#message').html(`<div>
               <h4>Guest name: ${matchResult}</h4>
               <img
               src= "${this.state.initialPhoto}"
               alt="img" />
             </div>
             `)
          }
        } else {
          matchResult = 'Unexpected result'
        }
        this.setState({matchName: matchResult})
     } // end function, handleMatchResult

   }; // end function, capture

   addPhoto = event => {
     event.preventDefault();
     //add customer photo to AWS collection
     API.addImg( {
       lastPhoto: this.state.lastPhoto,
       name: this.state.name
       }
     )
     // handle the data received from AWS
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
     .then(res => handlePostData(res.data))
     .catch(err => console.log(err));
   } // end function handlePostCustomer

     const handlePostData = data => {
       this.setState({addConfirm: "Guest added!", orderButtonVisibility: true});
     }
   }; // end function, addPhoto

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log('order placed');
  };

  // Keep ==================================
  getMenuData = event => {
    // event.preventDefault();
    this.clearGuestAdd();
    API.getMenuData()
  .then(res => this.hadleMenuData(res.data))
  .catch(err => console.log(err));
  } // end function getMenuData

  hadleMenuData = (data) => {
    this.setState({menu: data});
   console.log(this.state.menu);
   }
   // Keep ==================================

    countItem = (data) => {
      let orderedItemCount0 = this.state[data.alias];
      console.log('orderedItemCount0', orderedItemCount0);
      let orderedItemCount1 = orderedItemCount0+=1;
      console.log('orderedItemCount1', orderedItemCount1);
      this.setState({
        [data.alias]: orderedItemCount1
      })
    }

  postOrderData = (data) =>{
    this.countItem(data);
    API.postOrder({
    customerId: this.state.faceId,
    orderStatus: "open",
    dishName: data.dishName,
    alias: data.alias,
    price: data.price,
    menuSelection: data.menuSelection,
    table: this.state.table
    })
  .then(res => this.getCurrentOrderData(res.data))
  .catch(err => console.log(err));
  } // end function postOrderData

  getCurrentOrderData = data =>{
   API.getOrder(data.customerId)
   .then(res => this.handleDisplayOrders(res.data))
   .catch(err => console.log(err));
  }

  handleDisplayOrders = data =>{
    console.log(data)
    this.setState({orders: data})
  }
  // Keep ==================================

  handleDisplayCustomerInfo = data =>{
    console.log(data);
    this.setState({
      faceId: data.customerId,
      custName: data.customerName,
      table: data.tableNumber,
      tableImg: data.tableImg,
    })
  }

  handleDataTable = (id, data) =>{
  API.getCustomer(data.customerId)
  .then(res=>this.handleDisplayCustomerInfo(data))
  .catch(err => console.log(err));
  }

  closeTable = () =>{
    API.closeCurrentOrders(this.state.faceId)
    .then(res=> console.log(res.data))
    .catch(err => console.log(err));

    API.closeTable(this.state.table)
    .then(res=> console.log(res.data))
    .catch(err => console.log(err));
  }

  clearGuestAdd = () => {
    console.log('state.name added', this.state.name);
    console.log("clearEmployeeAdd");
    this.setState({name: "Name"});
    console.log('state.name cleared', this.state.name);
    $('#addConfirm').empty()
  }


  render() {
    return (
      <div>
        <Container className='font'>
          <h3>Create Dining History</h3>
          <Card title="Capture Guest Image">
            <ImageCapture
            setRef={this.setRef}
            capture={this.capture}
            />
            <div id='message'></div>
          </Card>
        </Container>

        {/* Add Guest Modal ==================================================*/}

        <div id="addGuestModal" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header modal-header-pers">
                <h5 className="modal-title">Upload Photo</h5>
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
                 this.state.orderButtonVisibility &&
                 <div className="text-center">
                 <button
                 type="button"
                 className="btn button-pers"
                 data-toggle="modal"
                 data-target="#orderModal"
                 data-dismiss="modal"
                 onClick={this.getMenuData}>
                 Next
                 </button>
                </div>
               }

              </div>

            </div>
          </div>
        </div>

        {/* Menu Modal =======================================================================*/}
        <div className="modal fade" id="orderModal" tabIndex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg dialog-margin-pers" role="document">
            <div className="modal-content order-modal-pers">
              <div className="modal-header modal-header-pers">
                <h5 className="modal-title" id="orderModalLabel">Create Dining History for {this.state.imageName}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Row>
                <Container>
                  <p>Select items below to simulate several prior visits</p>
                  </Container>
                </Row>
                <Row>
                  <Col size="md-2 ">
                  <p>Appetizer:</p>
                  <p>Beverage:</p>
                  <p>Dessert:</p>
                  <br></br>
                  <p>Protein:</p>
                  <p>Starch:</p>
                  <p>Vegetable:</p>
                  </Col>
                <Col size="md-10 ">
                  <Wrapper>
                    {this.state.menu
                     .map(dishes => (
                      <BulkMenuCard
                        key={dishes._id}
                        date={dishes.date}
                        dishName={dishes.dishName}
                        alias={dishes.alias}
                        menuSelection={dishes.menuSelection}
                        price={dishes.price}
                        postOrderData={this.postOrderData}
                        itemCount={this.state[dishes.alias]}
                      />))}
                    </Wrapper>
                  </Col>
                </Row>
                <div className=" text-center">
                  <button
                  type="button"
                  className="btn button-pers" data-dismiss="modal"  onClick={this.closeTable}>
                  Save History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    );
  }
}
export default Guest;
