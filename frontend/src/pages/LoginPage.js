import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg"
import { LightPurpleButton } from '../components/buttonStyles';
import styled, { keyframes } from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }

        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };


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
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <StyledMainContainer container component="main">
                <CssBaseline />
                <FloatingElements />
                <LoginFormSection item xs={12} sm={8} md={5} component={Paper} elevation={6}>
                    <FormContainer>
                        <LoginHeader>
                            <RoleIcon>
                                {role === 'Admin' ? '👨‍💼' : role === 'Student' ? '🎓' : '👨‍🏫'}
                            </RoleIcon>
                            <MainTitle variant="h4">
                                {role} Login
                            </MainTitle>
                            <SubTitle variant="h6">
                                Welcome back! Please enter your details
                            </SubTitle>
                        </LoginHeader>
                        <StyledForm component="form" noValidate onSubmit={handleSubmit}>
                            {role === "Student" ? (
                                <>
                                    <StyledTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="rollNumber"
                                        label="Enter your Roll Number"
                                        name="rollNumber"
                                        autoComplete="off"
                                        type="number"
                                        autoFocus
                                        error={rollNumberError}
                                        helperText={rollNumberError && 'Roll Number is required'}
                                        onChange={handleInputChange}
                                    />
                                    <StyledTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="studentName"
                                        label="Enter your name"
                                        name="studentName"
                                        autoComplete="name"
                                        error={studentNameError}
                                        helperText={studentNameError && 'Name is required'}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <StyledTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={emailError}
                                    helperText={emailError && 'Email is required'}
                                    onChange={handleInputChange}
                                />
                            )}
                            <StyledTextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <StyledIconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </StyledIconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormOptionsContainer container>
                                <StyledFormControlLabel
                                    control={<StyledCheckbox value="remember" />}
                                    label="Remember me"
                                />
                                <ForgotPasswordLink href="#">
                                    Forgot password?
                                </ForgotPasswordLink>
                            </FormOptionsContainer>
                            <EnhancedLoginButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loader}
                            >
                                {loader ?
                                    <><CircularProgress size={20} color="inherit" sx={{ mr: 1 }} /> Logging in...</>
                                    : "Login"}
                            </EnhancedLoginButton>
                            {role === "Admin" &&
                                <SignUpSection container>
                                    <SignUpText>
                                        Don't have an account?
                                    </SignUpText>
                                    <SignUpLink to="/Adminregister">
                                        Sign up
                                    </SignUpLink>
                                </SignUpSection>
                            }
                        </StyledForm>
                    </FormContainer>
                </LoginFormSection>
                <BackgroundSection
                    item
                    xs={false}
                    sm={4}
                    md={7}
                >
                    <BackgroundOverlay />
                    <BackgroundImage src={bgpic} alt="Login Background" />
                    <BackgroundContent>
                        <BackgroundTitle>Welcome to School Management System</BackgroundTitle>
                        <BackgroundText>
                            Streamline your educational institution with our comprehensive management solution.
                        </BackgroundText>
                    </BackgroundContent>
                </BackgroundSection>
            </StyledMainContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage

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

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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
    transform: scale(1.02);
  }
`;

const StyledMainContainer = styled(Grid)`
  && {
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(127, 86, 218, 0.1), rgba(127, 86, 218, 0.05));
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::before {
    top: 10%;
    left: 5%;
  }
  
  &::after {
    bottom: 10%;
    right: 10%;
    animation-delay: 4s;
  }
`;

const LoginFormSection = styled(Grid)`
  && {
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const FormContainer = styled(Box)`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  animation: ${slideInRight} 0.8s ease-out 0.2s both;
`;

const RoleIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const MainTitle = styled(Typography)`
  && {
    font-weight: 800;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #7f56da 0%, #667eea 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const SubTitle = styled(Typography)`
  && {
    color: #4a5568;
    font-weight: 400;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

const StyledForm = styled(Box)`
  width: 100%;
  max-width: 400px;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const StyledTextField = styled(TextField)`
  && {
    margin: 1rem 0;
    
    .MuiOutlinedInput-root {
      border-radius: 12px;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.8);
      
      &:hover {
        box-shadow: 0 4px 12px rgba(127, 86, 218, 0.15);
      }
      
      &.Mui-focused {
        box-shadow: 0 4px 20px rgba(127, 86, 218, 0.25);
        
        .MuiOutlinedInput-notchedOutline {
          border-color: #7f56da;
          border-width: 2px;
        }
      }
    }
    
    .MuiInputLabel-root {
      &.Mui-focused {
        color: #7f56da;
      }
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    color: #7f56da;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(127, 86, 218, 0.1);
      transform: scale(1.1);
    }
  }
`;

const FormOptionsContainer = styled(Grid)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    width: 100%;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  && {
    color: #4a5568;
    
    .MuiTypography-root {
      font-size: 0.9rem;
    }
  }
`;

const StyledCheckbox = styled(Checkbox)`
  && {
    color: #7f56da;
    
    &.Mui-checked {
      color: #7f56da;
    }
  }
`;

const ForgotPasswordLink = styled.a`
  color: #7f56da;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
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

const EnhancedLoginButton = styled(LightPurpleButton)`
  && {
    margin: 2rem 0 1rem;
    padding: 15px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 12px;
    text-transform: none;
    box-shadow: 0 8px 25px rgba(127, 86, 218, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(127, 86, 218, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      opacity: 0.7;
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


const SignUpSection = styled(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const SignUpText = styled.span`
  color: #4a5568;
  font-size: 0.95rem;
`;

const SignUpLink = styled(Link)`
  color: #7f56da;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
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

const BackgroundSection = styled(Grid)`
  && {
    position: relative;
    overflow: hidden;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(127, 86, 218, 0.8), rgba(102, 126, 234, 0.8));
  z-index: 2;
`;

const BackgroundContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 3;
  color: white;
  padding: 2rem;
  animation: ${fadeInUp} 1s ease-out 0.5s both;
`;

const BackgroundTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BackgroundText = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledBackdrop = styled(Backdrop)`
  && {
    color: #fff;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const BackdropText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
`;
