import React, { Component } from 'react';
import CommunityInfo from "./CommunityInfo";
import AvgPrice from "./AvgPrice";

class MainRender extends Component {
  constructor() {
    super();
    this.state = {
      priceInfo:[1,2,2,2,2,]
    };
  }
  callbackFunction = (childData) => {
    this.setState({info: childData})
  }
  render() {
    return (
      <div>
        <CommunityInfo/>
        
      </div>
    );
  }
}

export default MainRender;