import React, { Component } from 'react';
import './App.css';

/* the functions City and ZipSearchFields are functional components 
that are responsible for displaying the city information and the text input field  respectively

in the app class, a state object is created that holds the zipcode entered into the text field ,
and a array of cities, which  stores the data returned from the api call to 
http://ctp-zip-api.herokuapp.com/zip/

the render is responsible for displaying the content on the screen, hence the City and ZipSearchField components were
called inside of the render.

since there can be multiple cities assiciated with a zipcode, each of the  elemts in the cities[] array 
was mapped to a City component. 
*/

function City(props) {
  return (
  <div className="Card">
    <p>---------------------------------------</p>
    <p>City : {props.info.City}</p>
    <p>State : {props.info.State}</p>
    <p>Location : ({props.info.Lat} , {props.info.Long})</p>
    <p>Population : {props.info.EstimatedPopulation}</p>
    <p>Total Wages : {props.info.TotalWages}</p>
    <p>---------------------------------------</p>
  </div>);
}

function ZipSearchField(props) {
  return (
    <div className="Search-field">
      <input placeholder="enter a zipcode" 
      className="input-field" 
      maxLength="5"
      onChange={ (e)=> props.handleZipUpdate(e)} />
    </div>);
}


class App extends Component {

  state = {
    zipcode : '',
    cities : []
  }

  updateZipcode = (event)=>{
    this.setState({
      zipcode : event.target.value,
    })

    if(event.target.value.length === 5){
      console.log(`the zipcode is ${this.state.zipcode}`)

      fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        this.setState({
          cities : data
        })
      })
      .catch(error => {
        console.log("error retrieving data");
      })
    }else{
      this.setState({
        cities : []
      })
    }
  }//end of updateZipCode

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleZipUpdate={ (event) => this.updateZipcode(event)} />
        <div>
          { this.state.cities.map( city => <City info={city} />)}
        </div>
      </div>
    );
  }
}

export default App;
