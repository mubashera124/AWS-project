import React from 'react'
import styled, { keyframes } from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, Chip } from '@mui/material';
import { 
  School, 
  Class, 
  Person,
  Stars,
  AccountCircle,
  Badge
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      ? name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
      : 'ST';
  };

  return (
    <ProfileContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <ProfileHeaderCard>
              <ProfileBackground />
              <ProfileContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    <ProfileAvatarContainer>
                      <ProfileAvatar>
                        {getInitials(currentUser.name)}
                      </ProfileAvatar>
                      <StudentBadge>
                        <Badge sx={{ color: 'white' }} />
                      </StudentBadge>
                    </ProfileAvatarContainer>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                      <StudentName variant="h3">
                        {currentUser.name}
                      </StudentName>
                      <RoleChip 
                        icon={<Person />} 
                        label="Student" 
                        color="primary"
                      />
                      <ProfileMeta>
                        Roll Number: {currentUser.rollNum}
                      </ProfileMeta>
                    </Box>
                  </Grid>
                </Grid>
              </ProfileContent>
            </ProfileHeaderCard>
          </Grid>

          {/* Academic Information Cards */}
          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent>
                <InfoCardHeader>
                  <Class sx={{ fontSize: 40, color: '#4ecdc4' }} />
                  <InfoCardTitle variant="h5">
                    Academic Details
                  </InfoCardTitle>
                </InfoCardHeader>
                
                <InfoGrid container spacing={3}>
                  <Grid item xs={12}>
                    <InfoItem>
                      <InfoLabel>Class:</InfoLabel>
                      <InfoValue>{sclassName.sclassName}</InfoValue>
                    </InfoItem>
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem>
                      <InfoLabel>Roll Number:</InfoLabel>
                      <InfoValue>{currentUser.rollNum}</InfoValue>
                    </InfoItem>
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem>
                      <InfoLabel>Student Status:</InfoLabel>
                      <StatusChip label="Active" color="success" size="small" />
                    </InfoItem>
                  </Grid>
                </InfoGrid>
              </CardContent>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent>
                <InfoCardHeader>
                  <School sx={{ fontSize: 40, color: '#7f56da' }} />
                  <InfoCardTitle variant="h5">
                    School Information
                  </InfoCardTitle>
                </InfoCardHeader>
                
                <InfoGrid container spacing={3}>
                  <Grid item xs={12}>
                    <InfoItem>
                      <InfoLabel>Institution:</InfoLabel>
                      <InfoValue>{studentSchool.schoolName}</InfoValue>
                    </InfoItem>
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem>
                      <InfoLabel>Academic Year:</InfoLabel>
                      <InfoValue>2024-2025</InfoValue>
                    </InfoItem>
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem>
                      <InfoLabel>Enrollment:</InfoLabel>
                      <StatusChip label="Enrolled" color="info" size="small" />
                    </InfoItem>
                  </Grid>
                </InfoGrid>
              </CardContent>
            </InfoCard>
          </Grid>

          {/* Academic Progress Card */}
          <Grid item xs={12}>
            <ProgressCard>
              <CardContent>
                <ProgressHeader>
                  <Stars sx={{ fontSize: 40, color: '#45b7d1' }} />
                  <ProgressTitle variant="h5">
                    Academic Journey
                  </ProgressTitle>
                </ProgressHeader>
                
                <Grid container spacing={4} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <ProgressItem>
                      <ProgressIcon color="#7f56da">
                        <AccountCircle sx={{ fontSize: 30, color: 'white' }} />
                      </ProgressIcon>
                      <ProgressLabel>Student Profile</ProgressLabel>
                      <ProgressValue>Complete</ProgressValue>
                    </ProgressItem>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <ProgressItem>
                      <ProgressIcon color="#4ecdc4">
                        <Class sx={{ fontSize: 30, color: 'white' }} />
                      </ProgressIcon>
                      <ProgressLabel>Class Enrollment</ProgressLabel>
                      <ProgressValue>Active</ProgressValue>
                    </ProgressItem>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <ProgressItem>
                      <ProgressIcon color="#45b7d1">
                        <School sx={{ fontSize: 30, color: 'white' }} />
                      </ProgressIcon>
                      <ProgressLabel>Academic Status</ProgressLabel>
                      <ProgressValue>Good Standing</ProgressValue>
                    </ProgressItem>
                  </Grid>
                </Grid>
              </CardContent>
            </ProgressCard>
          </Grid>
        </Grid>
      </Container>
    </ProfileContainer>
  )
}

export default StudentProfile

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

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const ProfileHeaderCard = styled(Card)`
  && {
    position: relative;
    overflow: hidden;
    border-radius: 25px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    margin-bottom: 2rem;
    animation: ${fadeInUp} 0.8s ease-out;
  }
`;

const ProfileBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  
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

const ProfileContent = styled(CardContent)`
  && {
    position: relative;
    z-index: 2;
    padding: 3rem 2rem 2rem;
    margin-top: 100px;
  }
`;

const ProfileAvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
`;

const ProfileAvatar = styled(Avatar)`
  && {
    width: 140px;
    height: 140px;
    font-size: 3rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border: 5px solid white;
    animation: ${pulse} 3s ease-in-out infinite;
  }
`;

const StudentBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const StudentName = styled(Typography)`
  && {
    font-weight: 800;
    color: #2d3748;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 2rem;
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

const ProfileMeta = styled(Typography)`
  && {
    color: #718096;
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 1rem;
  }
`;

const InfoCard = styled(Card)`
  && {
    height: 100%;
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

const InfoCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const InfoCardTitle = styled(Typography)`
  && {
    font-weight: 700;
    color: #2d3748;
    margin-left: 1rem;
  }
`;

const InfoGrid = styled(Grid)`
  && {
    margin-top: 1rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f7fafc;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled(Typography)`
  && {
    font-weight: 600;
    color: #4a5568;
    font-size: 1rem;
  }
`;

const InfoValue = styled(Typography)`
  && {
    color: #2d3748;
    font-weight: 500;
    font-size: 1rem;
  }
`;

const StatusChip = styled(Chip)`
  && {
    font-weight: 600;
    border-radius: 20px;
  }
`;

const ProgressCard = styled(Card)`
  && {
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${fadeInUp} 1s ease-out 0.3s both;
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const ProgressTitle = styled(Typography)`
  && {
    font-weight: 700;
    color: #2d3748;
    margin-left: 1rem;
  }
`;

const ProgressItem = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ProgressIcon = styled.div`
  width: 70px;
  height: 70px;
  background: ${props => `linear-gradient(135deg, ${props.color}, ${props.color}dd)`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 25px ${props => `${props.color}40`};
  transition: transform 0.3s ease;
  
  ${ProgressItem}:hover & {
    transform: scale(1.1);
    animation: ${float} 2s ease-in-out infinite;
  }
`;

const ProgressLabel = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }
`;

const ProgressValue = styled(Typography)`
  && {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
