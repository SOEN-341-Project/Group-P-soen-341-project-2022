import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Sucess extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextPage();
    }
  render() {
      const  {values:{ firstname, lastname}} = this.props;

    return (
      <MuiThemeProvider>
          <React.Fragment>
            <h1>Your change is donde!</h1>

          </React.Fragment>
      </MuiThemeProvider>
    );
  }
}


export default Sucess