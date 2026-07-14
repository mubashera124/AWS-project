import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate('/Adminlogin');
    }
    else if (user === "Student") {
      navigate('/Studentlogin');
    }
    else if (user === "Teacher") {
      navigate('/Teacherlogin');
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <BackgroundPattern />
      <FloatingElements />
      <ContentWrapper>
        <PageHeader>
          <MainTitle>Choose Your Role</MainTitle>
          <SubTitle>Select your role to access the School Management System</SubTitle>
        </PageHeader>
        
        <Container>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <UserCard onClick={() => navigateHandler("Admin")} delay="0s">
                <StyledPaper elevation={3}>
                  <IconContainer color="#ff6b6b">
                    <AccountCircle fontSize="large" />
                  </IconContainer>
                  <StyledTypography>
                    Admin
                  </StyledTypography>
                  <Description>
                    Login as an administrator to access the dashboard to manage app data.
                  </Description>
                  <HoverEffect />
                </StyledPaper>
              </UserCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UserCard onClick={() => navigateHandler("Student")} delay="0.2s">
                <StyledPaper elevation={3}>
                  <IconContainer color="#4ecdc4">
                    <School fontSize="large" />
                  </IconContainer>
                  <StyledTypography>
                    Student
                  </StyledTypography>
                  <Description>
                    Login as a student to explore course materials and assignments.
                  </Description>
                  <HoverEffect />
                </StyledPaper>
              </UserCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <UserCard onClick={() => navigateHandler("Teacher")} delay="0.4s">
                <StyledPaper elevation={3}>
                  <IconContainer color="#45b7d1">
                    <Group fontSize="large" />
                  </IconContainer>
                  <StyledTypography>
                    Teacher
                  </StyledTypography>
                  <Description>
                    Login as a teacher to create courses, assignments, and track student progress.
                  </Description>
                  <HoverEffect />
                </StyledPaper>
              </UserCard>
            </Grid>
          </Grid>
        </Container>
      </ContentWrapper>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        <LoadingText>Please Wait</LoadingText>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const StyledContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  z-index: 1;
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    animation: ${float} 6s ease-in-out infinite;
  }
  
  &::before {
    top: -150px;
    left: -150px;
    animation-delay: 0s;
  }
  
  &::after {
    bottom: -150px;
    right: -150px;
    animation-delay: 3s;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const UserCard = styled.div`
  animation: ${fadeInUp} 0.8s ease-out ${props => props.delay} both;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const StyledPaper = styled(Paper)`
  padding: 2.5rem 1.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    & > div:first-child {
      animation: ${pulse} 0.6s ease-in-out;
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => `linear-gradient(135deg, ${props.color}, ${props.color}dd)`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px ${props => `${props.color}40`};
  
  svg {
    font-size: 2.5rem;
  }
`;

const StyledTypography = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2d3748;
  letter-spacing: -0.01em;
`;

const Description = styled.p`
  color: #4a5568;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
  padding: 0 0.5rem;
`;

const HoverEffect = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
  
  ${StyledPaper}:hover & {
    left: 100%;
  }
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
`;
