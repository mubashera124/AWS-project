import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <BackgroundDecoration />
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <ImageContainer>
                        <StyledImage src={Students} alt="students" />
                    </ImageContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            Welcome to
                            <br />
                            <GradientText>School Management</GradientText>
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <EnhancedLightPurpleButton variant="contained" fullWidth>
                                    Login
                                </EnhancedLightPurpleButton>
                            </StyledLink>
                            <SignUpText>
                                Don't have an account?{' '}
                                <SignUpLink to="/Adminregister">
                                    Sign up
                                </SignUpLink>
                            </SignUpText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

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
    transform: translateY(-10px);
  }
`;

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(127, 86, 218, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(127, 86, 218, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(127, 86, 218, 0);
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
  z-index: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  animation: ${float} 6s ease-in-out infinite;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledPaper = styled.div`
  padding: 3rem 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin: 2rem;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: linear-gradient(45deg, transparent, rgba(127, 86, 218, 0.1), transparent);
    z-index: -1;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 2rem 0;
  animation: ${fadeInUp} 1s ease-out 0.3s both;
`;

const StyledTitle = styled.h1`
  font-size: 3.5rem;
  color: #2d3748;
  font-weight: 800;
  padding-top: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 1rem;
  animation: ${fadeInUp} 0.8s ease-out 0.1s both;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #7f56da 0%, #667eea 100%);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientMove} 3s ease infinite;
`;

const StyledText = styled.p`
  color: #4a5568;
  margin: 2rem 0;
  letter-spacing: 0.01em;
  line-height: 1.8;
  font-size: 1.1rem;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  max-width: 90%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  max-width: 300px;
`;

const EnhancedLightPurpleButton = styled(LightPurpleButton)`
  && {
    padding: 15px 30px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    text-transform: none;
    box-shadow: 0 8px 25px rgba(127, 86, 218, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &:hover {
      background-color: #6c4fd6;
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(127, 86, 218, 0.4);
    }
    
    &:active {
      transform: translateY(0);
      animation: ${pulse} 0.6s;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s;
    }
    
    &:hover::before {
      left: 100%;
    }
  }
`;

const EnhancedOutlinedButton = styled(Button)`
  && {
    padding: 15px 30px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    text-transform: none;
    color: #7f56da;
    border: 2px solid #7f56da;
    background: transparent;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &:hover {
      background: rgba(127, 86, 218, 0.1);
      border-color: #6c4fd6;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(127, 86, 218, 0.2);
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(127, 86, 218, 0.1), transparent);
      transition: left 0.6s;
    }
    
    &:hover::before {
      left: 100%;
    }
  }
`;

const SignUpText = styled.p`
  color: #4a5568;
  margin-top: 1rem;
  font-size: 0.95rem;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const SignUpLink = styled(Link)`
  color: #7f56da;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: #6c4fd6;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #7f56da 0%, #667eea 100%);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;
