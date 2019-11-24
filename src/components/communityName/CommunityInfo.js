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

  /* this method is all the logic behind the returning specific average price based on community id
  this method has a param incoming(which is id from logic method to compare to the array of objects(called initialState)*/
  returnSpecificPrice(incoming) {
    const { info, priceInfo, avgPrice, error, isLoaded } = this.state;
    let initialState = [];
    let prices = [];

    info.forEach(
      e1 =>
        priceInfo.forEach(e2 => {
          if (e1.id === e2.communityId) {
            initialState.push({
              id: e1.id,
              price: e2.price
            });
          } //if
        }) //nested
    ); //forEach

    //this forEach compare the incoming id with stored in initial State
    initialState.forEach(i => {
      if (incoming === i.id) {
        prices.push(i.price);
      }
    });
    /* return the price. Uses reduce to sum the array and tofixed and else for easy readability*/
    return ((prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
  }

  /*This LogicMethod does the heavy lifting.. from some if logic to returning name images and avg price  */
  logicMethod() {
    const { info, priceInfo, avgPrice, error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <p className="name-items">
          {info.map(name => (
            <p key={name}>
              {name.name}: Average House Price : 
              {this.returnSpecificPrice(name.id)}
              {<img className src={name.imgUrl}></img>}
            </p>
          ))}
        </p>
      );
    } //else
  }

  render() {
    const { error, isLoaded, info, priceInfo } = this.state;
    return <div>{this.logicMethod()}</div>;
  } //render
} //component

export default CommunityInfo;
