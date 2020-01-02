import React from 'react';
import './App.css';
import axios from "axios";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      students : []
    }
  }
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/students/")

  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
         <ul>
           {this.state.students}
    </ul>
        </header>
      </div>
    );
  }
 
}

export default App;
