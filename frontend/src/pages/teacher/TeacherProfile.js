import React from 'react'
import styled from 'styled-components';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Box, 
  Grid, 
  Chip,
  Paper,
  Container,
  Divider,
  IconButton
} from '@mui/material';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/MenuBook';
import StarIcon from '@mui/icons-material/Star';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  // Generate initials from name
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'T';
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <ProfileContainer>
        {/* Header Card */}
        <HeaderCard elevation={3}>
          <HeaderContent>
            <ProfileAvatar>
              {getInitials(currentUser.name)}
            </ProfileAvatar>
            <HeaderInfo>
              <WelcomeText variant="h4">
                Welcome, {currentUser.name}!
              </WelcomeText>
              <SubtitleText variant="h6">
                {teachSubject.subName} Teacher
              </SubtitleText>
              <RatingContainer>
                <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                <StarIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>5.0</Typography>
              </RatingContainer>
            </HeaderInfo>
          </HeaderContent>
        </HeaderCard>

        {/* Profile Details Grid */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <InfoCard elevation={2}>
              <CardHeader>
                <PersonIcon sx={{ color: '#1976d2', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Personal Information</Typography>
              </CardHeader>
              <Divider sx={{ mb: 2 }} />
              <InfoItem>
                <InfoIcon><PersonIcon /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Full Name</InfoLabel>
                  <InfoValue>{currentUser.name}</InfoValue>
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoIcon><EmailIcon /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Email Address</InfoLabel>
                  <InfoValue>{currentUser.email}</InfoValue>
                </InfoContent>
              </InfoItem>
            </InfoCard>
          </Grid>

          {/* Professional Information */}
          <Grid item xs={12} md={6}>
            <InfoCard elevation={2}>
              <CardHeader>
                <SchoolIcon sx={{ color: '#1976d2', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Professional Details</Typography>
              </CardHeader>
              <Divider sx={{ mb: 2 }} />
              <InfoItem>
                <InfoIcon><SchoolIcon /></InfoIcon>
                <InfoContent>
                  <InfoLabel>School</InfoLabel>
                  <InfoValue>{teachSchool.schoolName}</InfoValue>
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoIcon><ClassIcon /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Class</InfoLabel>
                  <InfoValue>{teachSclass.sclassName}</InfoValue>
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoIcon><SubjectIcon /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Subject</InfoLabel>
                  <InfoValue>{teachSubject.subName}</InfoValue>
                </InfoContent>
              </InfoItem>
            </InfoCard>
          </Grid>
        </Grid>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <StatsCard elevation={2}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
                Quick Stats
              </Typography>
              <StatsContainer>
                <StatItem>
                  <StatNumber>150+</StatNumber>
                  <StatLabel>Students Taught</StatLabel>
                  <Chip label="Active" color="success" size="small" />
                </StatItem>
                <StatItem>
                  <StatNumber>95%</StatNumber>
                  <StatLabel>Success Rate</StatLabel>
                  <Chip label="Excellent" color="primary" size="small" />
                </StatItem>
                <StatItem>
                  <StatNumber>3+</StatNumber>
                  <StatLabel>Years Experience</StatLabel>
                  <Chip label="Experienced" color="warning" size="small" />
                </StatItem>
                <StatItem>
                  <StatNumber>4.9</StatNumber>
                  <StatLabel>Rating</StatLabel>
                  <Chip label="Top Rated" color="error" size="small" />
                </StatItem>
              </StatsContainer>
            </StatsCard>
          </Grid>
        </Grid>
      </ProfileContainer>
    </Container>
  )
}

export default TeacherProfile

// Styled Components
const ProfileContainer = styled(Box)`
  min-height: 100vh;
`;

const HeaderCard = styled(Paper)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px !important;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: rotate(45deg);
  }
`;

const HeaderContent = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileAvatar = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
  font-size: 2.5rem !important;
  font-weight: bold !important;
  background: rgba(255, 255, 255, 0.2) !important;
  border: 4px solid rgba(255, 255, 255, 0.3) !important;
  margin-right: 2rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const HeaderInfo = styled(Box)`
  flex: 1;
`;

const WelcomeText = styled(Typography)`
  font-weight: 700 !important;
  margin-bottom: 0.5rem !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const SubtitleText = styled(Typography)`
  opacity: 0.9;
  font-weight: 300 !important;
  margin-bottom: 1rem !important;
`;

const RatingContainer = styled(Box)`
  display: flex;
  align-items: center;
`;


const InfoCard = styled(Paper)`
  padding: 2rem;
  border-radius: 15px !important;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
  }
`;

const CardHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 10px;
  background: linear-gradient(145deg, #f5f5f5, #e8e8e8);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(145deg, #e8e8e8, #f5f5f5);
    transform: translateX(5px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  margin-right: 1rem;
  
  svg {
    font-size: 20px;
  }
`;

const InfoContent = styled(Box)`
  flex: 1;
`;

const InfoLabel = styled(Typography)`
  font-size: 0.85rem !important;
  color: #666 !important;
  font-weight: 500 !important;
  margin-bottom: 0.25rem !important;
`;

const InfoValue = styled(Typography)`
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  color: #333 !important;
`;

const StatsCard = styled(Paper)`
  padding: 2rem;
  border-radius: 15px !important;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important;
`;

const StatsContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatItem = styled(Box)`
  text-align: center;
  padding: 1.5rem;
  border-radius: 15px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled(Typography)`
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem !important;
`;

const StatLabel = styled(Typography)`
  color: #666 !important;
  font-weight: 500 !important;
  margin-bottom: 1rem !important;
`;
