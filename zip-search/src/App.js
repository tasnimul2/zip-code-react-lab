import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
  <div>
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
    <div>
      <input onChange={ (e)=> props.handleZipUpdate(e)} />
    </div>);
}


class App extends Component {

  state = {
    zipcode : '',
    cities : []
  }

  updateZipcode = (event)=>{

    console.log(event.target.value)
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
    }
  }

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
