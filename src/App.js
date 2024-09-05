import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize=12;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;
  state={
    progress:0
  }
setProgress=(progress)=>{
  this.setState({progress:progress})
}

  render() {
    return (
     
      <Router>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
      <Routes>
        <Route Exact path="/" element={<News setProgress={this.setProgress} key="general"  apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="general" />} />
        <Route Exact path="/business" element={<News setProgress={this.setProgress} key="business" apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="business" />} />
        <Route Exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="entertainment" />} />
        {/* <Route Exact path="/general" element={<News setProgress={this.setProgress} key="general" apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="general" />} /> */}
        <Route Exact path="/health" element={<News setProgress={this.setProgress} key="health" apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="health" />} />
        <Route Exact path="/science" element={<News setProgress={this.setProgress} key="science" apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="science" />} />
        <Route Exact path="/sports" element={<News setProgress={this.setProgress} key="sports" apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="sports" />} />
        <Route Exact path="/technology" element={<News setProgress={this.setProgress} key="technology" apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="technology" />} />

      </Routes>
    </Router>
      
    )
  }
}
