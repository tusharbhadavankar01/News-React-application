import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
        <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="general" searchQuery={searchQuery} />} />
        <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="business" searchQuery={searchQuery} />} />
        <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="entertainment" searchQuery={searchQuery} />} />
        <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="health" searchQuery={searchQuery} />} />
        <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="science" searchQuery={searchQuery} />} />
        <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="sports" searchQuery={searchQuery} />} />
        <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="technology" searchQuery={searchQuery} />} />
      </Routes>
    </Router>
  );
};

export default App;
