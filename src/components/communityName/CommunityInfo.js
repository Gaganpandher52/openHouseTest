import React, { Component } from "react";
import "./CommunityNames.css";
import axios from "axios";

class CommunityInfo extends Component {
  constructor() {
    super();
    //intitial state
    this.state = {
      error: null,
      isLoaded: false,
      info: [], //stores the fetch call
      priceInfo: [], //stores price info from fetch call,
      avgPrice: [
        {
          id: "",
          avgSpecific: [] //the goal is to save the house prices with same id.
        }
      ] //stores the average price with community id
    };
  } //constructor

  /*This componentdidmount handles the api endpoints and also set the state to the incoming data*/
  componentDidMount() {
    //fetches multiple api endpoints at once.
    Promise.all([
      axios.get(
        "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities"
      ),
      axios.get(
        "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes"
      )
    ]).then(([name, prices]) => {
      this.setState({
        isLoaded: true,
        priceInfo: prices.data,
        //.sort method sorts the data Alphabatically
        info: name.data.sort(function(a, b) {
          let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        })
      });
    });
  } //componentDidMount

  returnSpecificPrice(incoming){
    const { info, priceInfo, avgPrice, error, isLoaded } = this.state;
    let initialState = [];
    info.forEach(e1 =>
      priceInfo.forEach(e2 => {
        if (e1.id === e2.communityId) {
          initialState.push({
            id: e1.id,
            price: [e2.price]
          });
        } //if
      })
    );

    

  }

  /*This LogicMethod */
  logicMethod() {
    const { info, priceInfo, avgPrice, error, isLoaded } = this.state;
    // let initialState = [];
    // // for (let i in info) {
    // //   for (let j in priceInfo) {
    // //     if (info[i]["id"] === priceInfo[j]["communityId"]) {
    // //     }
    // //   }
    // // }
    // //this piece of code compare the state data and pushes it to an array
    // info.forEach(e1 =>
    //   priceInfo.forEach(e2 => {
    //     if (e1.id === e2.communityId) {
    //       initialState.push({
    //         id: e1.id,
    //         price: [e2.price]
    //       });
    //     } //if
    //   })
    // );
    // for(let i=0;i<initialState.length;i++){
    //   if(initialState[i]['id'] === initialState[i+1][id]){
    //     initialState[i][price] += [initialState[i+1]]

    //   }
    // }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <p className="name-items">
          {info.map(name => (
            // priceInfo.map(price => (
            // <p key={price}>
            // {price.price}
            // </p>
            <p key={name}>
              {name.name}: Average House Price{this.returnSpecificPrice(name.id)}
              {<img className src={name.imgUrl}></img>}
              {/* {price.price} */}
            </p>
            // ))//nested map
          ))}
        </p>
      );
    } //else

    // console.log(initialState);
  }

  render() {
    const { error, isLoaded, info, priceInfo } = this.state;

    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
    //   return (
    //     <p className="name-items">
    //       {info.map(name => (
    //         // priceInfo.map(price => (
    //           // <p key={price}>
    //             // {price.price}
    //           // </p>
    //         <p key={name}>
    //           {name.name}
    //           {<img className src={name.imgUrl}></img>}
    //           {/* {price.price} */}

    //         </p>
    //       // ))//nested map
    //       ))}
    //     </p>
    //   );
    // } //else
    return <div>{this.logicMethod()}</div>;
  } //render
} //component

export default CommunityInfo;
