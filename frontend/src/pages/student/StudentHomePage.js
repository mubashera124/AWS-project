import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, Box, Card, CardContent, LinearProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled, { keyframes } from 'styled-components';
import CountUp from 'react-countup';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import {
    MenuBook,
    Assignment as AssignmentIcon,
    TrendingUp,
    Person,
    School,
    NotificationsActive,
    CheckCircle,
    Schedule
} from '@mui/icons-material';

const StudentHomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    const handleQuickAction = (path) => {
        navigate(path);
    };

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    return (
        <DashboardContainer>
            <Container maxWidth="lg">
                {/* Welcome Section */}
                <WelcomeSection>
                    <WelcomeCard>
                        <CardContent>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={8}>
                                    <WelcomeContent>
                                        <WelcomeTitle variant="h4">
                                            Welcome back, {currentUser.name}! 🎓
                                        </WelcomeTitle>
                                        <WelcomeSubtitle variant="h6">
                                            Class: {currentUser.sclassName.sclassName} • Roll: {currentUser.rollNum}
                                        </WelcomeSubtitle>
                                        <AttendanceProgress>
                                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                                                Overall Attendance: {overallAttendancePercentage.toFixed(1)}%
                                            </Typography>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={overallAttendancePercentage} 
                                                sx={{
                                                    height: 8,
                                                    borderRadius: 4,
                                                    bgcolor: 'rgba(0,0,0,0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: overallAttendancePercentage >= 75 ? '#4caf50' : 
                                                                overallAttendancePercentage >= 60 ? '#ff9800' : '#f44336'
                                                    }
                                                }}
                                            />
                                        </AttendanceProgress>
                                    </WelcomeContent>
                                </Grid>
                                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                                    <StudentAvatar>
                                        <Person sx={{ fontSize: 60, color: 'white' }} />
                                    </StudentAvatar>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </WelcomeCard>
                </WelcomeSection>

                {/* Stats Cards */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <EnhancedStatsCard>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StatsIconContainer color="#7f56da">
                                    <MenuBook sx={{ fontSize: 40, color: 'white' }} />
                                </StatsIconContainer>
                                <StatsNumber>
                                    <Data start={0} end={numberOfSubjects} duration={2.5} />
                                </StatsNumber>
                                <StatsLabel>Total Subjects</StatsLabel>
                                <StatsDescription>Enrolled this semester</StatsDescription>
                            </CardContent>
                        </EnhancedStatsCard>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <EnhancedStatsCard>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StatsIconContainer color="#4ecdc4">
                                    <AssignmentIcon sx={{ fontSize: 40, color: 'white' }} />
                                </StatsIconContainer>
                                <StatsNumber>
                                    <Data start={0} end={subjectAttendance.length || 0} duration={4} />
                                </StatsNumber>
                                <StatsLabel>Attendance Records</StatsLabel>
                                <StatsDescription>Total class records</StatsDescription>
                            </CardContent>
                        </EnhancedStatsCard>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <EnhancedStatsCard>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StatsIconContainer color="#45b7d1">
                                    <TrendingUp sx={{ fontSize: 40, color: 'white' }} />
                                </StatsIconContainer>
                                <StatsNumber>
                                    <Data start={0} end={overallAttendancePercentage} duration={3} suffix="%" />
                                </StatsNumber>
                                <StatsLabel>Attendance Rate</StatsLabel>
                                <StatsDescription>
                                    {overallAttendancePercentage >= 75 ? 'Excellent!' : 
                                     overallAttendancePercentage >= 60 ? 'Good' : 'Needs Improvement'}
                                </StatsDescription>
                            </CardContent>
                        </EnhancedStatsCard>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <EnhancedStatsCard>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StatsIconContainer color="#ff6b6b">
                                    <School sx={{ fontSize: 40, color: 'white' }} />
                                </StatsIconContainer>
                                <StatsNumber>
                                    <Data start={0} end={currentUser.sclassName.sclassName.length} duration={2} />
                                </StatsNumber>
                                <StatsLabel>Class Level</StatsLabel>
                                <StatsDescription>{currentUser.sclassName.sclassName}</StatsDescription>
                            </CardContent>
                        </EnhancedStatsCard>
                    </Grid>
                </Grid>

                {/* Attendance Chart & Quick Actions */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <AttendanceCard>
                            <CardContent>
                                <AttendanceHeader>
                                    <CheckCircle sx={{ fontSize: 30, color: '#4caf50', mr: 2 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#2d3748' }}>
                                        Attendance Overview
                                    </Typography>
                                </AttendanceHeader>
                                <ChartContainer>
                                    {
                                        response ?
                                            <NoDataMessage>
                                                <Schedule sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                                                <Typography variant="h6" color="textSecondary">
                                                    No Attendance Data Found
                                                </Typography>
                                            </NoDataMessage>
                                            :
                                            <>
                                                {loading
                                                    ? (
                                                        <LoadingContainer>
                                                            <Typography variant="h6">Loading attendance...</Typography>
                                                        </LoadingContainer>
                                                    )
                                                    :
                                                    <>
                                                        {
                                                            subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                                <CustomPieChart data={chartData} />
                                                            )
                                                                :
                                                                <NoDataMessage>
                                                                    <Schedule sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                                                                    <Typography variant="h6" color="textSecondary">
                                                                        No Attendance Records
                                                                    </Typography>
                                                                </NoDataMessage>
                                                        }
                                                    </>
                                                }
                                            </>
                                    }
                                </ChartContainer>
                            </CardContent>
                        </AttendanceCard>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <QuickActionsCard>
                            <CardContent>
                                <QuickActionsHeader>
                                    <NotificationsActive sx={{ fontSize: 30, color: '#ff9800', mr: 2 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#2d3748' }}>
                                        Quick Actions
                                    </Typography>
                                </QuickActionsHeader>
                                <ActionsGrid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={6}>
                                        <ActionButton onClick={() => handleQuickAction('/Student/subjects')}>
                                            <MenuBook sx={{ fontSize: 24, mb: 1 }} />
                                            <Typography variant="body2" fontWeight={600}>
                                                View Subjects
                                            </Typography>
                                        </ActionButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ActionButton onClick={() => handleQuickAction('/Student/attendance')}>
                                            <TrendingUp sx={{ fontSize: 24, mb: 1 }} />
                                            <Typography variant="body2" fontWeight={600}>
                                                Check Attendance
                                            </Typography>
                                        </ActionButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ActionButton onClick={() => handleQuickAction('/Student/complain')}>
                                            <AssignmentIcon sx={{ fontSize: 24, mb: 1 }} />
                                            <Typography variant="body2" fontWeight={600}>
                                                Submit Complaint
                                            </Typography>
                                        </ActionButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ActionButton onClick={() => handleQuickAction('/Student/profile')}>
                                            <Person sx={{ fontSize: 24, mb: 1 }} />
                                            <Typography variant="body2" fontWeight={600}>
                                                My Profile
                                            </Typography>
                                        </ActionButton>
                                    </Grid>
                                </ActionsGrid>
                            </CardContent>
                        </QuickActionsCard>
                    </Grid>
                </Grid>

            </Container>
        </DashboardContainer>
    )
}

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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Main Container
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

// Welcome Section
const WelcomeSection = styled.div`
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const WelcomeCard = styled(Card)`
  && {
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
    color: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      animation: ${float} 8s ease-in-out infinite;
    }
  }
`;

const WelcomeContent = styled.div`
  position: relative;
  z-index: 2;
`;

const WelcomeTitle = styled(Typography)`
  && {
    font-weight: 800;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const WelcomeSubtitle = styled(Typography)`
  && {
    opacity: 0.9;
    font-weight: 400;
    margin-bottom: 1.5rem;
  }
`;

const AttendanceProgress = styled.div`
  margin-top: 1rem;
`;

const StudentAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: ${pulse} 3s ease-in-out infinite;
`;

// Stats Cards
const EnhancedStatsCard = styled(Card)`
  && {
    height: 240px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${slideIn} 0.8s ease-out;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }
  }
`;

const StatsIconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => `linear-gradient(135deg, ${props.color}, ${props.color}dd)`};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 25px ${props => `${props.color}40`};
  transition: transform 0.3s ease;
  
  ${EnhancedStatsCard}:hover & {
    transform: scale(1.1);
    animation: ${float} 2s ease-in-out infinite;
  }
`;

const StatsNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatsLabel = styled(Typography)`
  && {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }
`;

const StatsDescription = styled(Typography)`
  && {
    font-size: 0.9rem;
    color: #718096;
    line-height: 1.4;
  }
`;

const Data = styled(CountUp)`
  font-size: inherit;
  font-weight: inherit;
`;

// Attendance & Actions Cards
const AttendanceCard = styled(Card)`
  && {
    height: 400px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${fadeInUp} 1s ease-out;
  }
`;

const AttendanceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NoDataMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const QuickActionsCard = styled(Card)`
  && {
    height: 400px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${fadeInUp} 1s ease-out 0.2s both;
  }
`;

const QuickActionsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const ActionsGrid = styled(Grid)`
  && {
    height: 250px;
  }
`;

const ActionButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  
  &:hover {
    background: rgba(127, 86, 218, 0.1);
    border-color: rgba(127, 86, 218, 0.2);
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;



export default StudentHomePage
