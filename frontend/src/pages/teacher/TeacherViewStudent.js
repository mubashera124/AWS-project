import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Box, 
  Button, 
  Collapse, 
  Table, 
  TableBody, 
  TableHead, 
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  Divider,
  IconButton,
  CircularProgress
} from '@mui/material';
import { 
  KeyboardArrowDown, 
  KeyboardArrowUp,
  Person,
  School,
  Class,
  Grade,
  EventAvailable,
  TrendingUp,
  Assessment,
  CalendarToday,
  CheckCircle,
  Cancel,
  Star
} from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    // Generate initials from student name
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'S';
    };

    // Get attendance status color
    const getAttendanceColor = (percentage) => {
        if (percentage >= 90) return '#4caf50';
        if (percentage >= 75) return '#ff9800';
        return '#f44336';
    };

    // Get grade based on marks
    const getGrade = (marks) => {
        if (marks >= 90) return 'A+';
        if (marks >= 80) return 'A';
        if (marks >= 70) return 'B+';
        if (marks >= 60) return 'B';
        if (marks >= 50) return 'C';
        return 'D';
    };

    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress size={60} sx={{ color: '#667eea' }} />
                <Typography variant="h6" sx={{ mt: 2, color: '#667eea' }}>Loading student details...</Typography>
            </LoadingContainer>
        );
    }

    return (
        <StudentContainer>
            <Container maxWidth="lg">
                {/* Header Card */}
                <HeaderCard elevation={3}>
                    <HeaderBackground />
                    <HeaderContent>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                                <AvatarContainer>
                                    <StudentAvatar>
                                        {getInitials(userDetails.name)}
                                    </StudentAvatar>
                                    <StudentBadge>
                                        <Person sx={{ color: 'white' }} />
                                    </StudentBadge>
                                </AvatarContainer>
                            </Grid>
                            
                            <Grid item xs={12} md={8}>
                                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <StudentName variant="h3">
                                        {userDetails.name}
                                    </StudentName>
                                    <RoleChip 
                                        icon={<Person />} 
                                        label="Student" 
                                        color="primary"
                                    />
                                    <StudentMeta>
                                        <Grid container spacing={2} sx={{ mt: 1 }}>
                                            <Grid item xs={12} sm={4}>
                                                <MetaItem>
                                                    <Class sx={{ mr: 1, color: '#667eea' }} />
                                                    <Typography variant="body1">
                                                        Class: {sclassName.sclassName}
                                                    </Typography>
                                                </MetaItem>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <MetaItem>
                                                    <Grade sx={{ mr: 1, color: '#667eea' }} />
                                                    <Typography variant="body1">
                                                        Roll: {userDetails.rollNum}
                                                    </Typography>
                                                </MetaItem>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <MetaItem>
                                                    <School sx={{ mr: 1, color: '#667eea' }} />
                                                    <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                                                        {studentSchool.schoolName}
                                                    </Typography>
                                                </MetaItem>
                                            </Grid>
                                        </Grid>
                                    </StudentMeta>
                                </Box>
                            </Grid>
                        </Grid>
                    </HeaderContent>
                </HeaderCard>

                <Grid container spacing={4} sx={{ mt: 2 }}>
                    {/* Attendance Section */}
                    <Grid item xs={12} md={8}>
                        <SectionCard elevation={2}>
                            <SectionHeader>
                                <EventAvailable sx={{ fontSize: 30, color: '#4ecdc4', mr: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    Attendance Overview
                                </Typography>
                            </SectionHeader>
                            <Divider sx={{ mb: 3 }} />
                            
                            {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ?
                                <>
                                    {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                        if (subName === teachSubject) {
                                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                            const attendanceColor = getAttendanceColor(subjectAttendancePercentage);
                                            
                                            return (
                                                <AttendanceCard key={index}>
                                                    <AttendanceHeader>
                                                        <SubjectInfo>
                                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                                {subName}
                                                            </Typography>
                                                            <AttendanceChip 
                                                                label={`${subjectAttendancePercentage}%`}
                                                                style={{ backgroundColor: attendanceColor }}
                                                            />
                                                        </SubjectInfo>
                                                        <StatsContainer>
                                                            <StatItem>
                                                                <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                                                                <Typography variant="body2">
                                                                    Present: {present}
                                                                </Typography>
                                                            </StatItem>
                                                            <StatItem>
                                                                <Cancel sx={{ color: '#f44336', mr: 1 }} />
                                                                <Typography variant="body2">
                                                                    Absent: {sessions - present}
                                                                </Typography>
                                                            </StatItem>
                                                            <StatItem>
                                                                <CalendarToday sx={{ color: '#2196f3', mr: 1 }} />
                                                                <Typography variant="body2">
                                                                    Total: {sessions}
                                                                </Typography>
                                                            </StatItem>
                                                        </StatsContainer>
                                                    </AttendanceHeader>
                                                    
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                                        <ActionButton
                                                            variant="outlined"
                                                            onClick={() => handleOpen(subId)}
                                                            startIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                        >
                                                            {openStates[subId] ? 'Hide' : 'View'} Details
                                                        </ActionButton>
                                                        
                                                        <ActionButton
                                                            variant="contained"
                                                            onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                                                            startIcon={<EventAvailable />}
                                                        >
                                                            Add Attendance
                                                        </ActionButton>
                                                    </Box>

                                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                        <AttendanceDetails>
                                                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                                                Daily Attendance Record
                                                            </Typography>
                                                            <AttendanceList>
                                                                {allData.map((data, index) => {
                                                                    const date = new Date(data.date);
                                                                    const dateString = date.toString() !== "Invalid Date" ? 
                                                                        date.toLocaleDateString('en-US', { 
                                                                            weekday: 'short',
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric'
                                                                        }) : "Invalid Date";
                                                                    
                                                                    return (
                                                                        <AttendanceItem key={index}>
                                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                                <CalendarToday sx={{ mr: 2, color: '#666', fontSize: 20 }} />
                                                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                                                    {dateString}
                                                                                </Typography>
                                                                            </Box>
                                                                            <StatusChip 
                                                                                label={data.status}
                                                                                color={data.status === 'Present' ? 'success' : 'error'}
                                                                                size="small"
                                                                            />
                                                                        </AttendanceItem>
                                                                    );
                                                                })}
                                                            </AttendanceList>
                                                        </AttendanceDetails>
                                                    </Collapse>
                                                </AttendanceCard>
                                            )
                                        }
                                        return null;
                                    })}
                                </>
                                :
                                <EmptyState>
                                    <EventAvailable sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                                    <Typography variant="h6" color="textSecondary" gutterBottom>
                                        No attendance records found
                                    </Typography>
                                    <ActionButton
                                        variant="contained"
                                        onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                                        startIcon={<EventAvailable />}
                                    >
                                        Add First Attendance
                                    </ActionButton>
                                </EmptyState>
                            }
                        </SectionCard>
                    </Grid>

                    {/* Quick Stats & Chart */}
                    <Grid item xs={12} md={4}>
                        <SectionCard elevation={2} sx={{ mb: 2 }}>
                            <SectionHeader>
                                <TrendingUp sx={{ fontSize: 30, color: '#ff6b6b', mr: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Quick Stats
                                </Typography>
                            </SectionHeader>
                            <Divider sx={{ mb: 3 }} />
                            
                            <StatsGrid>
                                <QuickStat>
                                    <StatNumber style={{ color: getAttendanceColor(overallAttendancePercentage) }}>
                                        {overallAttendancePercentage.toFixed(1)}%
                                    </StatNumber>
                                    <StatLabel>Overall Attendance</StatLabel>
                                </QuickStat>
                                
                                <QuickStat>
                                    <StatNumber style={{ color: '#2196f3' }}>
                                        {subjectAttendance.length || 0}
                                    </StatNumber>
                                    <StatLabel>Total Records</StatLabel>
                                </QuickStat>
                            </StatsGrid>
                        </SectionCard>
                        
                        {/* Chart */}
                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                            <ChartCard elevation={2}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                                    Attendance Distribution
                                </Typography>
                                <CustomPieChart data={chartData} />
                            </ChartCard>
                        )}
                    </Grid>

                    {/* Marks Section */}
                    <Grid item xs={12}>
                        <SectionCard elevation={2}>
                            <SectionHeader>
                                <Assessment sx={{ fontSize: 30, color: '#9c27b0', mr: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    Academic Performance
                                </Typography>
                            </SectionHeader>
                            <Divider sx={{ mb: 3 }} />
                            
                            {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ?
                                <>
                                    {subjectMarks.map((result, index) => {
                                        if (result.subName.subName === teachSubject) {
                                            const grade = getGrade(result.marksObtained);
                                            return (
                                                <MarksCard key={index}>
                                                    <MarksHeader>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                                {result.subName.subName}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Subject Assessment
                                                            </Typography>
                                                        </Box>
                                                        <GradeDisplay>
                                                            <Typography variant="h3" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                                                                {result.marksObtained}
                                                            </Typography>
                                                            <GradeChip label={`Grade: ${grade}`} />
                                                        </GradeDisplay>
                                                    </MarksHeader>
                                                    
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star 
                                                                key={i} 
                                                                sx={{ 
                                                                    color: i < Math.floor(result.marksObtained / 20) ? '#ffc107' : '#e0e0e0',
                                                                    fontSize: 24,
                                                                    mr: 0.5
                                                                }} 
                                                            />
                                                        ))}
                                                        <Typography variant="body2" sx={{ ml: 2, color: '#666' }}>
                                                            {result.marksObtained}/100 points
                                                        </Typography>
                                                    </Box>
                                                </MarksCard>
                                            )
                                        }
                                        return null;
                                    })}
                                    
                                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                                        <PurpleButton 
                                            variant="contained"
                                            size="large"
                                            onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                                            startIcon={<Assessment />}
                                        >
                                            Update Marks
                                        </PurpleButton>
                                    </Box>
                                </>
                                :
                                <EmptyState>
                                    <Assessment sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                                    <Typography variant="h6" color="textSecondary" gutterBottom>
                                        No marks recorded yet
                                    </Typography>
                                    <PurpleButton 
                                        variant="contained"
                                        onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                                        startIcon={<Assessment />}
                                    >
                                        Add First Mark
                                    </PurpleButton>
                                </EmptyState>
                            }
                        </SectionCard>
                    </Grid>
                </Grid>
            </Container>
        </StudentContainer>
    )
}

export default TeacherViewStudent

// Styled Components
const StudentContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;

const HeaderCard = styled(Card)`
  && {
    position: relative;
    overflow: hidden;
    border-radius: 25px !important;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
    margin-bottom: 2rem;
  }
`;

const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><circle cx="30" cy="30" r="4"/></g></g></svg>');
  }
`;

const HeaderContent = styled(CardContent)`
  && {
    position: relative;
    z-index: 2;
    padding: 3rem 2rem 2rem !important;
    margin-top: 100px;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
`;

const StudentAvatar = styled(Avatar)`
  && {
    width: 140px;
    height: 140px;
    font-size: 3rem;
    font-weight: bold;
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
    color: white;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border: 5px solid white;
  }
`;

const StudentBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const StudentName = styled(Typography)`
  && {
    font-weight: 800 !important;
    color: #2d3748;
    margin-bottom: 1rem !important;
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 2rem !important;
    }
  }
`;

const RoleChip = styled(Chip)`
  && {
    margin: 0.5rem 0;
    font-weight: 600;
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
    color: white;
    font-size: 1rem;
    padding: 0.5rem;
    
    .MuiChip-icon {
      color: white;
    }
  }
`;

const StudentMeta = styled.div`
  margin-top: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SectionCard = styled(Card)`
  && {
    border-radius: 20px !important;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    height: 100%;
    
    .MuiCardContent-root {
      padding: 2rem !important;
    }
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const AttendanceCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #4ecdc4;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SubjectInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AttendanceChip = styled(Chip)`
  && {
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled(Button)`
  && {
    border-radius: 25px;
    padding: 0.5rem 1.5rem;
    font-weight: 600;
    text-transform: none;
    
    &.MuiButton-contained {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      
      &:hover {
        background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
      }
    }
    
    &.MuiButton-outlined {
      border-color: #667eea;
      color: #667eea;
      
      &:hover {
        background: rgba(102, 126, 234, 0.1);
      }
    }
  }
`;

const AttendanceDetails = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
`;

const AttendanceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AttendanceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const StatusChip = styled(Chip)`
  && {
    font-weight: 600;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const QuickStat = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled(Typography)`
  && {
    font-size: 2rem !important;
    font-weight: 700 !important;
    margin-bottom: 0.5rem !important;
  }
`;

const StatLabel = styled(Typography)`
  && {
    color: #666 !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
  }
`;

const ChartCard = styled(Card)`
  && {
    border-radius: 20px !important;
    padding: 1rem;
    background: white;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
  }
`;

const MarksCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #9c27b0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const MarksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const GradeDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const GradeChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
    color: white;
    font-weight: 600;
    margin-top: 0.5rem;
  }
`;
