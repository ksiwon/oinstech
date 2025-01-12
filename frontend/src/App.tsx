import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter와 Routes, Route를 가져옵니다.
import { theme } from './styles/theme'; // theme.ts 경로에 맞게 수정
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import Tester from './pages/Tester';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            {/* 라우트 설정 */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<div>Search Page</div>} />
            <Route path="/match" element={<div>Match Page</div>} />
            <Route path="/schedule" element={<div>Schedule Page</div>} />
            <Route path="/chat" element={<div>Chat Page</div>} />
            <Route path="/tester" element={<Tester />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
