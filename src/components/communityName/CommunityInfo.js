import React, { Component } from 'react';

class CommunityInfo extends Component {
  constructor(){
    super()
    this.state = {
      error:null,
      isLoaded:false,
      info : []

    }
  }
  getName = () => {
    fetch('/https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities')
    .then(res => res.json())
    .then(info => this.setState({ info }));

  }

  componentDidMount(){
    fetch('https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities')
    .then(res => res.json())
    .then((result) => {
      this.setState({
        isLoaded:true,
        info: result
      });
    },
    //handle error here
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }



  render() {
    const {error, isLoaded, info} = this.state;
    if(error){
      return <div>Error: {error.message}</div>
    } else if(!isLoaded){
      return <div>Loading...</div>
    } else{
      return (
        <ul>
          {info.map(name => (
            <li key={info.name}>
              {name.name} 
            </li>
          ))}
        </ul>
      );
      
    }
    
  }
}

export default CommunityInfo;