import React from 'react';
import { countryList } from './countries';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //Initialize state of class
    this.state = {
      value: '', //string inputted by user
      str: '', //error message or list of countries from JSON file
      showResults: false //boolean that shows results div when true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Change state value when the input text is changed
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  //Handle input, update state values, and show results when submit button is clicked
  handleSubmit(event) {
    this.setState({showResults: true}); //Display results
    event.preventDefault(); //Prevents user from submitting blank value
    var code = this.state.value.toUpperCase(); //Converts input to uppercase to match destinations 
    //Find index of country code in JSON file
    var index = -1;
    for (var i = 0; i < countryList.length; i++) {
      if (code === countryList[i].destination) {
        index = i;
      }
    }
    //Update state string error message if country code is not found
    if (index === -1) {
      this.setState({str: "Invalid input. Please try again."});
    }
    //Update state string to the list of countries for the code given
    else {
      var s = "";
      for (i = 0; i < countryList[index].list.length; i++) {
          s = s.concat(countryList[index].list[i]);
          if (i < countryList[index].list.length - 1) 
            s = s.concat(", ");
      }
      this.setState({str: s});
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Plase enter a 3-digit country code: </p>
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
        
        {(this.state.showResults && 
          <div>
            <h3>Results: </h3>
            <p>
            {this.state.str}
            </p>
          </div>
        )}
      </div>
    );
  }
}

