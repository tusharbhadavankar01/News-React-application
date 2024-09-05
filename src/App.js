import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
export default class App extends Component {
  pageSize=12;
  render() {
    return (
     
      <Router>
      <Navbar />
      <Routes>
        <Route Exact path="/" element={<News key="general"  pageSize={this.pageSize} country="us" category="general" />} />
        <Route Exact path="/business" element={<News key="business" pageSize={this.pageSize} country="us" category="business" />} />
        <Route Exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
        {/* <Route Exact path="/general" element={<News key="general" pageSize={this.pageSize} country="us" category="general" />} /> */}
        <Route Exact path="/health" element={<News key="health" pageSize={this.pageSize} country="us" category="health" />} />
        <Route Exact path="/science" element={<News key="science" pageSize={this.pageSize} country="us" category="science" />} />
        <Route Exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
        <Route Exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country="us" category="technology" />} />

      </Routes>
    </Router>
      
    )
  }
}
