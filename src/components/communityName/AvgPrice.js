import React, { Component } from 'react';
import MainRender from '.';

class AvgPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      priceInfo:[], //stores price info from fetch call
      test:'hello world'
      
    };
  }

  componentDidMount(){
    fetch(
      "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes",
      "https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            priceInfo: result,
            test:'hello'
          });
        },

        //handle error here
        error => {
          this.setState({
            isLoaded: true,
            error: 1
          });
        }
      );
  }
  


  render() {
    const { error, isLoaded, priceInfo } = this.state;
    return (
      <div>
        <p>
          {priceInfo.map(price => (
            <p key={price}>
              {price.price} 
            </p>
          ))}
        </p>
        
        
      </div>
    );
  }
}

export default AvgPrice;