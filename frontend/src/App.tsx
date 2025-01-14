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
import Mypage from './pages/Mypage';
import Chat from './pages/Chat';

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
            <Route path="/chat" element={<Chat />} />
            <Route path="/tester" element={<Tester />} />
            <Route path="/signup/student" element={<SignupStudent />} />
            <Route path="/login/student" element={<LoginStudent />} />
            <Route path="/signup/teacher" element={<SignupTeacher />} />
            <Route path="/login/teacher" element={<LoginTeacher />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
