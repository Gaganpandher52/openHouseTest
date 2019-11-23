import React, { Component } from "react";
import "./CommunityNames.css";
import axios from "axios";

class CommunityInfo extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      info: [], //stores the fetch call
      priceInfo: [], //stores price info from fetch call,
      avgPrice: [] //stores the average price with community id
    };
  }

  componentDidMount() {
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

  logicMethod() {
    const { info, priceInfo, avgPrice } = this.state;
    for (let i in info) {
      for (let j in priceInfo) {
        if (info[i]["id"] === priceInfo[j]["communityId"]) {
        }
      }
    }
    // console.log(avgPrice)
  }

  render() {
    const { error, isLoaded, info, priceInfo } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <p className="name-items">
          {info.map(name => (
            <p key={name}>
              {name.name} {<img className src={name.imgUrl}></img>}
            </p>
          ))}
        </p>
      );
    } //else
    return <div>{this.logicMethod()}</div>;
  } //render
} //component

export default CommunityInfo;
