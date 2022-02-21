import React, { Component } from 'react'
import Name2 from './Name2';
import Success from './Sucess'
export class Name extends Component {
    state={
        page: 1,
        firstname:'',
        lastname:''
    }

    nextPage = () => {
        const {page} = this.state;
        this.setState({ page: page+1});
    }

    previoustPage = () => {
        const {page} = this.state;
        this.setState({ page: page-1});
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

  render() {
    const {page} = this.state;
    const {firstname,lastname} = this.state;
    const values ={firstname,lastname}
    
    switch(step) {
      case 1:
          return(
              <Name2 
              nextPage = {this.nextPage}
              handleChange ={this.handleChange}
              values={value}
              />
          )
      
      case 2:
          return <Sucess/>


          }
  }
}

export default Name