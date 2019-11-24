import React, { Component } from 'react';
import CommunityInfo from "./CommunityInfo";


class MainRender extends Component {
  render() {
    return (
      <div>
        <h4 style={{textAlign:"center"}}>Welcome to Open House</h4>
        <CommunityInfo/>
      </div>
    );
  }
}

export default MainRender;