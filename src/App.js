import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import Dashboard from "./pages/user";

class App extends Component {
    state = {
        isLogin: false
    };

    render() {
        var changeLoginStatus = () => {
            this.setState({ isLogin: true });
        };

        return (
          <div className="App">      
           <Dashboard/> 
          </div>
        );
    }
}



export default App;