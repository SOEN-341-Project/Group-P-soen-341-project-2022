import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class Name2 extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextPage();
    }
  render() {
      const {value, handleChange}= this.props;

    return (
      <MuiThemeProvider>
          <React.Fragment>
             <TextField
                hintText="Enter Your First Name"
                floatingLabelText="First Name"
                onChange={handleChange('firstname')}
                defaultValue={ values.firstname}
                />
                <br/>
                <TextField
                hintText="Enter Your Last Name"
                floatingLabelText="Last Name"
                onChange={handleChange('firstname')}
                defaultValue={ values.lastname}
                /> 
                <br/>
                <RaisedButton
                    label=" Change"
                    Primary = {true}
                    style={styles.button}
                    onClick={this.continue}
                />

          </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles ={
    button: {
        margin:20
    }
}
export default Name2