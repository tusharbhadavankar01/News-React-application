import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  return (
    <Router>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
        <Route path="/" element={<News setProgress={setProgress} key="general" apiKey={apiKey} pageSize={pageSize} country="us" category="general" />} />
        <Route path="/business" element={<News setProgress={setProgress} key="business" apiKey={apiKey} pageSize={pageSize} country="us" category="business" />} />
        <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" apiKey={apiKey} pageSize={pageSize} country="us" category="entertainment" />} />
        <Route path="/health" element={<News setProgress={setProgress} key="health" apiKey={apiKey} pageSize={pageSize} country="us" category="health" />} />
        <Route path="/science" element={<News setProgress={setProgress} key="science" apiKey={apiKey} pageSize={pageSize} country="us" category="science" />} />
        <Route path="/sports" element={<News setProgress={setProgress} key="sports" apiKey={apiKey} pageSize={pageSize} country="us" category="sports" />} />
        <Route path="/technology" element={<News setProgress={setProgress} key="technology" apiKey={apiKey} pageSize={pageSize} country="us" category="technology" />} />
      </Routes>
    </Router>
  );
};

export default App;