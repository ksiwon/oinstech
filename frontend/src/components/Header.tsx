import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearUserData } from "../redux/slices/userSlice";
import {
  HeaderContainer,
  LogoAndNav,
  Logo,
  Nav,
  NavItem,
  AuthSection,
  AuthButton,
  UserSection,
  UserName,
} from "./Header.styles";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태 가져오기
  const { role, studentData, teacherData } = useSelector((state: RootState) => state.user);
  const isLoggedIn = role !== null;
  const username = role === "student" ? studentData?.name : teacherData?.name;

  // 네비게이션 핸들러
  const handleNavClick = (path: string) => navigate(path);

  // 로그아웃 핸들러
  const handleLogout = () => {
    dispatch(clearUserData());
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/tester");
  }

  return (
    <HeaderContainer>
      {/* 로고 및 네비게이션 */}
      <LogoAndNav>
        <Logo onClick={() => handleNavClick("/")}>Co:next</Logo>
        {isLoggedIn && (
          <Nav>
            <NavItem onClick={() => handleNavClick("/search")}>
              {role === "teacher" ? "학생 찾기" : "강사 찾기"}
            </NavItem>
            <NavItem onClick={() => handleNavClick("/match")}>그룹 매칭</NavItem>
            <NavItem onClick={() => handleNavClick("/schedule")}>스케줄 관리</NavItem>
            <NavItem onClick={() => handleNavClick("/chat")}>채팅</NavItem>
          </Nav>
        )}
      </LogoAndNav>

      {/* 인증 섹션 */}
      {isLoggedIn ? (
        <UserSection>
          <UserName>{username} 님</UserName>
          <AuthButton onClick={handleLogout}>Log Out</AuthButton>
        </UserSection>
      ) : (
        <AuthSection>
          <AuthButton onClick={handleLogin}>Login</AuthButton>
        </AuthSection>
      )}
    </HeaderContainer>
  );
};

export default Header;
