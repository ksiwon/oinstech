import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Tester from './pages/Tester';
import Home from './pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignupStudent from './pages/SignupStudent';
import LoginStudent from './pages/LoginStudent';
import SignupTeacher from './pages/SignupTeacher';
import LoginTeacher from './pages/LoginTeacher';

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
            <Route path="/signup/student" element={<div><SignupStudent /></div>} />
            <Route path="/login/student" element={<div><LoginStudent /></div>} />
            <Route path="/signup/teacher" element={<div><SignupTeacher /></div>} />
            <Route path="/login/teacher" element={<div><LoginTeacher /></div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
