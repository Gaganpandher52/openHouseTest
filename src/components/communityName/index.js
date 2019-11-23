import React, { Component } from 'react';
import CommunityInfo from "./CommunityInfo";
import AvgPrice from "./AvgPrice";

class MainRender extends Component {
  constructor() {
    super();
    this.state = {
    };
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