import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
export default class App extends Component {
  render() {
    return (
     
      <Router>
      <Navbar />
      <Routes>
        <Route Exact path="/" element={<News key="general"  pageSize={12} country="us" category="general" />} />
        <Route Exact path="/business" element={<News key="business" pageSize={12} country="us" category="business" />} />
        <Route Exact path="/entertainment" element={<News key="entertainment" pageSize={12} country="us" category="entertainment" />} />
        {/* <Route Exact path="/general" element={<News key="general" pageSize={12} country="us" category="general" />} /> */}
        <Route Exact path="/health" element={<News key="health" pageSize={12} country="us" category="health" />} />
        <Route Exact path="/science" element={<News key="science" pageSize={12} country="us" category="science" />} />
        <Route Exact path="/sports" element={<News key="sports" pageSize={12} country="us" category="sports" />} />
        <Route Exact path="/technology" element={<News key="technology" pageSize={12} country="us" category="technology" />} />
      </Routes>
    </Router>
      
    )
  }
}
