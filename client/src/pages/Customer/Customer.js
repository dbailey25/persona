import React, { Component } from "react";
import { ImageCapture, AddImage } from "../../components/ImageCapture";
import TableAssign from "../../components/TableAssign";
import BulkOrder from "../../components/BulkOrder";
import API from "../../utils/API";
import $ from "jquery";

class Customer extends Component {
  state = {
      userName: 'N/A',
      lastPhoto: "",
      name: "",
      matchName: "",
      faceId: "",
      imageName: "",
      initialPhoto: "",
      addPicVisibility: 'invisible',
      currentPicVisibility: 'invisible',
      initialPicVisibility: 'invisible',
      menu: []
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




  getMenuData = event => {
    event.preventDefault();
    API.getMenuData()
  .then(res => this.hadleMenuData(res.data))
  .catch(err => console.log(err));
  }

  handleMenuData = (data) => {
    this.setState({menu: data});
   console.log(this.state.menu);
   }

  writeTable = () => {
    console.log("writeTable");
    const maxVisits = 5;
    var dishNumber = 1;
    let dishes = this.state.menu;

    var html = `<td>${dishes[dishNumber].dishName}</td>`;
      for (var i = 0; i < dishes.length ; i++) {
          // add opening <tr> tag to the string:
          html += '<tr>';
          for (var j = 0; j < maxVisits; j++) {
              // add <td> elements to the string:
              html += `<td>
              <MenuCheckBox
                key=${dishes[dishNumber]._id}
                date=${dishes[dishNumber].date}
                dishName=${dishes[dishNumber].dishName}
                menuSelection=${dishes[dishNumber].menuSelection}
                postOrder=${this.postOrder}
              />
              </td>`;
              dishNumber++;
          }
          // add closing </tr> tag to the string:
          html += '</tr>';
      }
      //append created html to the table body:
      $('#body').append(html);
      // reset the count:
      dishNumber = 1;
}



  postOrder = (data) => {
    alert(data.dishName, "was ordered");
    // API.postOrder(
    //   {
    //     faceId: this.state.faceId,
    //     customerId: this.state.name,
    //     waiterId: 'bulk',
    //     orderStatus: 'bulk',
    //     alias: 'bulk'
    //   }
    // )
    // .then(res => console.log(res.data, 'ordered'))
    // .catch(err => console.log(err));
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
        <TableAssign
        visibility={this.state.initialPicVisibility}
        />
        <AddImage
        visibility={this.state.addPicVisibility}
        addPhoto={this.addPhoto}
        handleInputChange={this.handleInputChange}/>
        <BulkOrder
        visibility={this.state.initialPicVisibility}
        menu={this.state.menu}
        postOrder={this.postOrder} />
      </div>
    );
  } // end function, render
} // end class, Host

export default Customer;
