import React, { Component } from "react";
// import { Col, Row } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import MenuCard from "../../components/MenuCard";
import "./Guest.css"
import API from "../../utils/API";
import { ImageCapture, AddImage, CurrentImageDisplay } from "../../components/ImageCapture";

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
    table: 1,
    position: 1,
    tableImg: "",
    menu: [],
    tables: [],
    orders: [],
    check: []
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
      this.setState({tablebuttonVisibility: false});

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
        } else if (res.data.message) {
          matchResult = res.data.message
          this.setState({matchName: matchResult})
          $('#message').html(`<h4>${this.state.matchName}</h4>`)
        } else if (res.data.FaceMatches) {
          this.setState({faceId: res.data.FaceMatches[0].Face.FaceId});
          API.getCustomer(res.data.FaceMatches[0].Face.FaceId).then(res => handleDisplayData(res.data),
          this.setState({currentPicVisibility: 'visible', initialPicVisibility: 'visible', tablebuttonVisibility: true}),
          // matchResult = res.data.FaceMatches[0].Face.ExternalImageId,
          console.log('initialPhoto', this.state.initialPhoto),
          )

         const handleDisplayData = data => {
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
       this.setState({initialPhoto: data.photo, addConfirm: "Guest added!"});
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
  API.getMenuData()
.then(res => this.hadleMenuData(res.data))
.catch(err => console.log(err));
}

hadleMenuData = (data) => {
  this.setState({menu: data});
 console.log(this.state.menu);
 }
 // Keep ==================================

postOrderData = (data) =>{
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
}
// Keep ==================================

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




// handleDisplayCustomerInfo = data =>{
//   console.log(data);
//   this.setState({
//     faceId: data.customerId,
//     custName: data.customerName,
//     table: data.tableNumber,
//     tableImg: data.tableImg,
//
//   })
//
//   API.getHistoricalData(data.customerId)
//    .then(res => this.handleHistoricalData(res.data))
//    .catch(err => console.log(err));
// }
//
// handleHistoricalData = data => {
//   let appetizer = [{dish: "N/A", value: 0}];
//   let beverage = [{dish: "N/A", value: 0}];
//   let protein = [{dish: "N/A", value: 0}];
//   let vegetable = [{dish: "N/A", value: 0}];
//   let starch = [{dish: "N/A", value: 0}];
//   let dessert = [{dish: "N/A", value: 0}];
//
//
//   for (let value of data){
//     if(value._id.menu === "Appetizer"){
//       appetizer.push({dish: value._id.dish, value: value.count});
//     }else if(value._id.menu === "Beverage"){
//       beverage.push({dish: value._id.dish, value: value.count});
//     }else if(value._id.menu === "Protein"){
//       protein.push({dish: value._id.dish, value: value.count});
//     }else if(value._id.menu === "Vegetable"){
//       vegetable.push({dish: value._id.dish, value: value.count});
//     }else if(value._id.menu === "Starch"){
//       starch.push({dish: value._id.dish, value: value.count});
//     }else if(value._id.menu === "Dessert"){
//       dessert.push({dish: value._id.dish, value: value.count});
//     }
//     }
//
//
//    let obj1 = Math.max.apply(Math,appetizer.map(function(o){return o.value;}));
//    let app = appetizer.find(function(o){ return o.value === obj1; });
//
//    let obj2 = Math.max.apply(Math,beverage.map(function(o){return o.value;}));
//    let bev = beverage.find(function(o){ return o.value === obj2; });
//
//    let obj3 = Math.max.apply(Math,protein.map(function(o){return o.value;}));
//    let prot = protein.find(function(o){ return o.value === obj3; });
//
//    let obj4 = Math.max.apply(Math,vegetable.map(function(o){return o.value;}));
//    let veg = vegetable.find(function(o){ return o.value === obj4; });
//
//    let obj5 = Math.max.apply(Math,starch.map(function(o){return o.value;}));
//    let star = starch.find(function(o){ return o.value === obj5; });
//
//    let obj6 = Math.max.apply(Math,dessert.map(function(o){return o.value;}));
//    let dess = dessert.find(function(o){ return o.value === obj6; });
//
//
//    this.setState({
//     bevPref: bev.dish,
//     appPref: app.dish,
//     protPref: prot.dish,
//     vegPref: veg.dish,
//     starchPref: star.dish,
//     dessertPref: dess.dish
//    })
// }

//
// getCheck = () => {
//   API.getTotalAmount(this.state.faceId)
//   .then(res=>this.handleTotalCheck(res.data))
//   .catch(err => console.log(err));
// }
//
// handleTotalCheck = data => {
//   this.setState({check: data})
// };
//
// closeTable = () =>{
//   API.closeCurrentOrders(this.state.faceId)
//   .then(res=> this.emptyCurrentOrders(res.data))
//   .catch(err => console.log(err));
//
//   API.closeTable(this.state.table)
//   .then(res=> console.log(res.data))
//   .catch(err => console.log(err));
// }
//
// emptyCurrentOrders = () =>{
//   this.setState({orders:[]})
// }

  render() {
    return (
      <div>
      <h3>Bulk Order Page</h3>
      <ImageCapture
      setRef={this.setRef}
      capture={this.capture}
      />
      <div id='message'></div>
      {
        this.state.displayCurrentImage && <div>
        <CurrentImageDisplay
        lastPhoto={this.state.lastPhoto}/>
        <AddImage
        addPhoto={this.addPhoto}
        addConfirm={this.state.addConfirm}
        handleInputChange={this.handleInputChange}/>
        </div>
      }

          <Wrapper>
            {this.state.menu
               .map(dishes => (
                <MenuCard
                  key={dishes._id}
                  date={dishes.date}
                  dishName={dishes.dishName}
                  alias={dishes.alias}
                  menuSelection={dishes.menuSelection}
                  price={dishes.price}
                  postOrderData={this.postOrderData}
              />))}
          </Wrapper>
      </div>
    );
  }
}
export default Guest;