import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Container, Typography, Tab, IconButton, Card, CardContent, Grid, Chip, Avatar, Paper, Button
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Class as ClassIcon,
    MenuBook,
    Group,
    Person as PersonIcon,
    School,
    Dashboard
} from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';

const ClassDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getClassStudents(classID));
        //         dispatch(resetSubjects())
        //         dispatch(getSubjectList(classID, "ClassSubjects"))
        //     })
    }

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        navigate(`/Admin/class/subject/${classID}/${row.id}`)
                    }}
                >
                    View
                </BlueButton >
            </>
        );
    };

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => {
        return (
            <>
                {response ?
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </GreenButton>
                    </Box>
                    :
                    <>
                        <Typography variant="h5" gutterBottom>
                            Subjects List:
                        </Typography>

                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        <SpeedDialTemplate actions={subjectActions} />
                    </>
                }
            </>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Admin/students/student/attendance/" + row.id)
                    }
                >
                    Attendance
                </PurpleButton>
            </>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Students
                            </GreenButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Students List:
                        </Typography>

                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        <SpeedDialTemplate actions={studentActions} />
                    </>
                )}
            </>
        )
    }

    const ClassTeachersSection = () => {
        return (
            <>
                Teachers
            </>
        )
    }

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <ClassDetailsContainer>
                {/* Header Section */}
                <ClassHeaderCard>
                    <CardContent sx={{ textAlign: 'center', pb: 0 }}>
                        <ClassIconContainer>
                            <ClassIcon sx={{ fontSize: 60, color: 'white' }} />
                        </ClassIconContainer>
                        <ClassTitle variant="h3">
                            {sclassDetails && sclassDetails.sclassName}
                        </ClassTitle>
                        <ClassSubtitle variant="h6">
                            Class Information & Management
                        </ClassSubtitle>
                    </CardContent>
                </ClassHeaderCard>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                        <StatsCard>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StatsIconContainer color="#7f56da">
                                    <MenuBook sx={{ fontSize: 40, color: 'white' }} />
                                </StatsIconContainer>
                                <StatsNumber>{numberOfSubjects}</StatsNumber>
                                <StatsLabel>Total Subjects</StatsLabel>
                                <StatsDescription>
                                    Active subjects in curriculum
                                </StatsDescription>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <StatsCard>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StatsIconContainer color="#4ecdc4">
                                    <Group sx={{ fontSize: 40, color: 'white' }} />
                                </StatsIconContainer>
                                <StatsNumber>{numberOfStudents}</StatsNumber>
                                <StatsLabel>Enrolled Students</StatsLabel>
                                <StatsDescription>
                                    Active student registrations
                                </StatsDescription>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <StatsCard>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StatsIconContainer color="#45b7d1">
                                    <School sx={{ fontSize: 40, color: 'white' }} />
                                </StatsIconContainer>
                                <StatsNumber>Active</StatsNumber>
                                <StatsLabel>Class Status</StatsLabel>
                                <StatsDescription>
                                    Currently active class
                                </StatsDescription>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                </Grid>

                {/* Quick Actions */}
                <ActionsCard sx={{ mt: 4 }}>
                    <CardContent>
                        <ActionTitle variant="h6" gutterBottom>
                            <Dashboard sx={{ mr: 1 }} />
                            Quick Actions
                        </ActionTitle>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {getresponse && (
                                <Grid item xs={12} sm={6}>
                                    <EnhancedGreenButton
                                        variant="contained"
                                        fullWidth
                                        startIcon={<PersonIcon />}
                                        onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                                    >
                                        Add Students
                                    </EnhancedGreenButton>
                                </Grid>
                            )}
                            {response && (
                                <Grid item xs={12} sm={6}>
                                    <EnhancedGreenButton
                                        variant="contained"
                                        fullWidth
                                        startIcon={<MenuBook />}
                                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                                    >
                                        Add Subjects
                                    </EnhancedGreenButton>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                                <OutlinedActionButton
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<Dashboard />}
                                    onClick={() => setValue('2')}
                                >
                                    View Subjects
                                </OutlinedActionButton>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <OutlinedActionButton
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<Group />}
                                    onClick={() => setValue('3')}
                                >
                                    View Students
                                </OutlinedActionButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </ActionsCard>
            </ClassDetailsContainer>
        );
    }

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <LoadingSpinner>
                        <ClassIcon sx={{ fontSize: 60, color: '#7f56da' }} />
                    </LoadingSpinner>
                    <Typography variant="h6" sx={{ mt: 2, color: '#7f56da' }}>
                        Loading class details...
                    </Typography>
                </LoadingContainer>
            ) : (
                <MainContainer>
                    <TabContext value={value}>
                        <EnhancedTabContainer>
                            <StyledTabList 
                                onChange={handleChange} 
                                centered
                                TabIndicatorProps={{
                                    style: {
                                        background: 'linear-gradient(135deg, #7f56da 0%, #667eea 100%)',
                                        height: 3
                                    }
                                }}
                            >
                                <StyledTab 
                                    icon={<Dashboard />} 
                                    iconPosition="start" 
                                    label="Details" 
                                    value="1" 
                                />
                                <StyledTab 
                                    icon={<MenuBook />} 
                                    iconPosition="start" 
                                    label="Subjects" 
                                    value="2" 
                                />
                                <StyledTab 
                                    icon={<Group />} 
                                    iconPosition="start" 
                                    label="Students" 
                                    value="3" 
                                />
                                <StyledTab 
                                    icon={<PersonIcon />} 
                                    iconPosition="start" 
                                    label="Teachers" 
                                    value="4" 
                                />
                            </StyledTabList>
                        </EnhancedTabContainer>
                        
                        <StyledContainer>
                            <StyledTabPanel value="1">
                                <ClassDetailsSection />
                            </StyledTabPanel>
                            <StyledTabPanel value="2">
                                <EnhancedSectionContainer>
                                    <SectionHeader>
                                        <MenuBook sx={{ mr: 2, fontSize: 30, color: '#7f56da' }} />
                                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2d3748' }}>
                                            Class Subjects
                                        </Typography>
                                    </SectionHeader>
                                    <ClassSubjectsSection />
                                </EnhancedSectionContainer>
                            </StyledTabPanel>
                            <StyledTabPanel value="3">
                                <EnhancedSectionContainer>
                                    <SectionHeader>
                                        <Group sx={{ mr: 2, fontSize: 30, color: '#4ecdc4' }} />
                                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2d3748' }}>
                                            Class Students
                                        </Typography>
                                    </SectionHeader>
                                    <ClassStudentsSection />
                                </EnhancedSectionContainer>
                            </StyledTabPanel>
                            <StyledTabPanel value="4">
                                <EnhancedSectionContainer>
                                    <SectionHeader>
                                        <PersonIcon sx={{ mr: 2, fontSize: 30, color: '#45b7d1' }} />
                                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2d3748' }}>
                                            Class Teachers
                                        </Typography>
                                    </SectionHeader>
                                    <ClassTeachersSection />
                                </EnhancedSectionContainer>
                            </StyledTabPanel>
                        </StyledContainer>
                    </TabContext>
                </MainContainer>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;

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
    transform: scale(1.02);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Main Layout Components
const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const LoadingSpinner = styled.div`
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const EnhancedTabContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const StyledTabList = styled(TabList)`
  && {
    .MuiTabs-flexContainer {
      gap: 1rem;
    }
  }
`;

const StyledTab = styled(Tab)`
  && {
    font-weight: 600;
    text-transform: none;
    font-size: 1rem;
    color: #4a5568;
    transition: all 0.3s ease;
    border-radius: 8px;
    margin: 0.5rem;
    min-height: 60px;
    
    &.Mui-selected {
      color: #7f56da;
      background: rgba(127, 86, 218, 0.1);
    }
    
    &:hover {
      background: rgba(127, 86, 218, 0.05);
      transform: translateY(-2px);
    }
    
    .MuiTab-iconWrapper {
      margin-bottom: 0;
      margin-right: 8px;
    }
  }
`;

const StyledContainer = styled(Container)`
  && {
    padding: 2rem;
    max-width: 1200px;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  && {
    padding: 0;
    animation: ${fadeInUp} 0.6s ease-out;
  }
`;

// Class Details Components
const ClassDetailsContainer = styled.div`
  padding: 1rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const ClassHeaderCard = styled(Card)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #667eea 100%);
    color: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(127, 86, 218, 0.3);
    margin-bottom: 2rem;
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
      animation: ${float} 6s ease-in-out infinite;
    }
  }
`;

const ClassIconContainer = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const ClassTitle = styled(Typography)`
  && {
    font-weight: 800;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ClassSubtitle = styled(Typography)`
  && {
    opacity: 0.9;
    font-weight: 300;
    margin-bottom: 2rem;
  }
`;

const StatsCard = styled(Card)`
  && {
    height: 200px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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
  
  ${StatsCard}:hover & {
    transform: scale(1.1);
  }
`;

const StatsNumber = styled(Typography)`
  && {
    font-size: 2.5rem;
    font-weight: 800;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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

const ActionsCard = styled(Card)`
  && {
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const ActionTitle = styled(Typography)`
  && {
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #2d3748;
  }
`;

const EnhancedGreenButton = styled(GreenButton)`
  && {
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    text-transform: none;
    box-shadow: 0 8px 25px rgba(19, 49, 4, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(19, 49, 4, 0.4);
    }
  }
`;

const OutlinedActionButton = styled(Button)`
  && {
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    text-transform: none;
    color: #7f56da;
    border: 2px solid #7f56da;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      background: rgba(127, 86, 218, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(127, 86, 218, 0.2);
    }
  }
`;

// Section Components
const EnhancedSectionContainer = styled.div`
  animation: ${slideIn} 0.8s ease-out;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid #f0f0f0;
`;
