import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Chip,
  Button,
  TextField,
  Collapse,
  Divider,
  IconButton
} from '@mui/material';
import {
  Person,
  Email,
  School,
  Edit,
  Save,
  Cancel,
  KeyboardArrowDown,
  KeyboardArrowUp,
  AdminPanelSettings,
  Dashboard,
  Group,
  MenuBook
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';
import styled, { keyframes } from 'styled-components';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { currentUser, response, error } = useSelector((state) => state.user);
    
    const [editMode, setEditMode] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    
    // Edit form states
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [schoolName, setSchoolName] = useState(currentUser?.schoolName || '');
    const [password, setPassword] = useState('');

    const handleEditToggle = () => {
        setShowEditForm(!showEditForm);
        if (!showEditForm) {
            // Reset form values when opening edit mode
            setName(currentUser?.name || '');
            setEmail(currentUser?.email || '');
            setSchoolName(currentUser?.schoolName || '');
            setPassword('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = password === '' 
            ? { name, email, schoolName } 
            : { name, email, password, schoolName };
        
        dispatch(updateUser(fields, currentUser._id, 'Admin'));
        setShowEditForm(false);
        setPassword(''); // Clear password field
    };

    const handleCancel = () => {
        setShowEditForm(false);
        setName(currentUser?.name || '');
        setEmail(currentUser?.email || '');
        setSchoolName(currentUser?.schoolName || '');
        setPassword('');
    };

    // Generate initials for avatar
    const getInitials = (name) => {
        return name
            ? name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
            : 'AD';
    };

    if (!currentUser) {
        return (
            <Container>
                <Typography>Loading profile...</Typography>
            </Container>
        );
    }

    return (
        <ProfileContainer>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Profile Header Card */}
                    <Grid item xs={12}>
                        <ProfileHeaderCard>
                            <ProfileBackground />
                            <ProfileContent>
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item>
                                        <ProfileAvatar>
                                            {getInitials(currentUser.name)}
                                        </ProfileAvatar>
                                    </Grid>
                                    <Grid item xs>
                                        <Box>
                                            <ProfileName variant="h4">
                                                {currentUser.name}
                                            </ProfileName>
                                            <RoleChip 
                                                icon={<AdminPanelSettings />} 
                                                label="Administrator" 
                                                color="primary"
                                            />
                                            <ProfileMeta>
                                                Member since {new Date(currentUser.createdAt || Date.now()).getFullYear()}
                                            </ProfileMeta>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <EditButton
                                            variant="contained"
                                            startIcon={showEditForm ? <Cancel /> : <Edit />}
                                            onClick={handleEditToggle}
                                            color={showEditForm ? "secondary" : "primary"}
                                        >
                                            {showEditForm ? 'Cancel' : 'Edit Profile'}
                                        </EditButton>
                                    </Grid>
                                </Grid>
                            </ProfileContent>
                        </ProfileHeaderCard>
                    </Grid>

                    {/* Edit Form */}
                    <Grid item xs={12}>
                        <Collapse in={showEditForm} timeout={500}>
                            <EditFormCard>
                                <CardContent>
                                    <EditFormTitle variant="h6" gutterBottom>
                                        <Edit sx={{ mr: 1 }} />
                                        Edit Profile Information
                                    </EditFormTitle>
                                    <Divider sx={{ mb: 3 }} />
                                    
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <StyledTextField
                                                    fullWidth
                                                    label="Full Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    InputProps={{
                                                        startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <StyledTextField
                                                    fullWidth
                                                    label="Email Address"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    InputProps={{
                                                        startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <StyledTextField
                                                    fullWidth
                                                    label="School Name"
                                                    value={schoolName}
                                                    onChange={(e) => setSchoolName(e.target.value)}
                                                    required
                                                    InputProps={{
                                                        startAdornment: <School sx={{ mr: 1, color: 'action.active' }} />
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <StyledTextField
                                                    fullWidth
                                                    label="New Password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    helperText="Leave blank to keep current password"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                                    <SaveButton
                                                        type="submit"
                                                        variant="contained"
                                                        startIcon={<Save />}
                                                    >
                                                        Save Changes
                                                    </SaveButton>
                                                    <CancelButton
                                                        type="button"
                                                        variant="outlined"
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </CancelButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                            </EditFormCard>
                        </Collapse>
                    </Grid>

                    {/* Profile Information Cards */}
                    <Grid item xs={12} md={6}>
                        <InfoCard>
                            <CardContent>
                                <InfoCardTitle variant="h6" gutterBottom>
                                    <Person sx={{ mr: 1 }} />
                                    Personal Information
                                </InfoCardTitle>
                                <Divider sx={{ mb: 2 }} />
                                <InfoItem>
                                    <InfoLabel>Full Name:</InfoLabel>
                                    <InfoValue>{currentUser.name}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Email:</InfoLabel>
                                    <InfoValue>{currentUser.email}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Role:</InfoLabel>
                                    <InfoValue>Administrator</InfoValue>
                                </InfoItem>
                            </CardContent>
                        </InfoCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InfoCard>
                            <CardContent>
                                <InfoCardTitle variant="h6" gutterBottom>
                                    <School sx={{ mr: 1 }} />
                                    Institution Details
                                </InfoCardTitle>
                                <Divider sx={{ mb: 2 }} />
                                <InfoItem>
                                    <InfoLabel>School Name:</InfoLabel>
                                    <InfoValue>{currentUser.schoolName}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Account Type:</InfoLabel>
                                    <InfoValue>Administrative</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Access Level:</InfoLabel>
                                    <InfoValue>Full Management</InfoValue>
                                </InfoItem>
                            </CardContent>
                        </InfoCard>
                    </Grid>

                    {/* Quick Stats */}
                    <Grid item xs={12}>
                        <StatsCard>
                            <CardContent>
                                <StatsTitle variant="h6" gutterBottom>
                                    <Dashboard sx={{ mr: 1 }} />
                                    Quick Overview
                                </StatsTitle>
                                <Divider sx={{ mb: 3 }} />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <StatItem>
                                            <Group sx={{ fontSize: 40, color: '#7f56da', mb: 1 }} />
                                            <StatLabel>System Role</StatLabel>
                                            <StatValue>Administrator</StatValue>
                                        </StatItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <StatItem>
                                            <MenuBook sx={{ fontSize: 40, color: '#4ecdc4', mb: 1 }} />
                                            <StatLabel>Institution</StatLabel>
                                            <StatValue>{currentUser.schoolName}</StatValue>
                                        </StatItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <StatItem>
                                            <AdminPanelSettings sx={{ fontSize: 40, color: '#45b7d1', mb: 1 }} />
                                            <StatLabel>Access Level</StatLabel>
                                            <StatValue>Full Management</StatValue>
                                        </StatItem>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                </Grid>
            </Container>
        </ProfileContainer>
    )
}

export default AdminProfile

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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
`;

const ProfileHeaderCard = styled(Card)`
  && {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    animation: ${fadeInUp} 0.8s ease-out;
  }
`;

const ProfileBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(135deg, #7f56da 0%, #667eea 50%, #4ecdc4 100%);
`;

const ProfileContent = styled(CardContent)`
  && {
    position: relative;
    z-index: 2;
    padding: 2rem;
    padding-top: 3rem;
  }
`;

const ProfileAvatar = styled(Avatar)`
  && {
    width: 120px;
    height: 120px;
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    border: 4px solid white;
  }
`;

const ProfileName = styled(Typography)`
  && {
    font-weight: 800;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const RoleChip = styled(Chip)`
  && {
    margin: 0.5rem 0;
    font-weight: 600;
    background: linear-gradient(135deg, #7f56da 0%, #667eea 100%);
    color: white;
    
    .MuiChip-icon {
      color: white;
    }
  }
`;

const ProfileMeta = styled(Typography)`
  && {
    color: #718096;
    font-size: 0.9rem;
  }
`;

const EditButton = styled(Button)`
  && {
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 8px 25px rgba(127, 86, 218, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(127, 86, 218, 0.4);
    }
  }
`;

const EditFormCard = styled(Card)`
  && {
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(127, 86, 218, 0.2);
    animation: ${fadeInUp} 0.6s ease-out;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #7f56da, #667eea, #4ecdc4);
    }
  }
`;

const EditFormTitle = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #2d3748;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 12px;
      transition: all 0.3s ease;
      
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

const SaveButton = styled(Button)`
  && {
    padding: 12px 30px;
    border-radius: 50px;
    font-weight: 600;
    text-transform: none;
    background: linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%);
    box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #45b7d1 0%, #4ecdc4 100%);
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(78, 205, 196, 0.4);
    }
  }
`;

const CancelButton = styled(Button)`
  && {
    padding: 12px 30px;
    border-radius: 50px;
    font-weight: 600;
    text-transform: none;
    border: 2px solid #e2e8f0;
    color: #4a5568;
    
    &:hover {
      border-color: #cbd5e0;
      background: rgba(226, 232, 240, 0.1);
    }
  }
`;

const InfoCard = styled(Card)`
  && {
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    animation: ${slideIn} 0.8s ease-out;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    }
  }
`;

const InfoCardTitle = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #2d3748;
  }
`;

const InfoItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f7fafc;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled(Typography)`
  && {
    font-weight: 600;
    color: #4a5568;
    font-size: 0.95rem;
  }
`;

const InfoValue = styled(Typography)`
  && {
    color: #2d3748;
    font-weight: 500;
    font-size: 0.95rem;
  }
`;

const StatsCard = styled(Card)`
  && {
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    animation: ${fadeInUp} 1s ease-out 0.3s both;
  }
`;

const StatsTitle = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #2d3748;
  }
`;

const StatItem = styled(Box)`
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StatLabel = styled(Typography)`
  && {
    color: #718096;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
`;

const StatValue = styled(Typography)`
  && {
    color: #2d3748;
    font-weight: 700;
    font-size: 1.1rem;
  }
`;
