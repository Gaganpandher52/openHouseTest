import React, { Component } from 'react';
import './CommunityNames.css'

class CommunityInfo extends Component {
  constructor(){
    super()
    this.state = {
      error:null,
      isLoaded:false,
      info : []
    }
  }
  componentDidMount(){
    fetch('https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities')
    .then(res => res.json())
    .then((result) => {
      this.setState({
        isLoaded:true,
        //.sort function sorts aplabatically
        info: result.sort(function(a,b){
          let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
          if(nameA < nameB){
            return -1 
          }if(nameA < nameB){
            return 1
          }
          return 0
          
        })
      });
    },
    //handle error here
    (error) => {
      this.setState({
        isLoaded: true,
        error:1,
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
        <p className='name-items'>
          {info.map(name => (
            <p key={name}>
              {name.name} {<img className src={name.imgUrl}></img>}
            </p>
          ))}
        </p>
      ); 
    }
  }
}

export default CommunityInfo;