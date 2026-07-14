import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    {/* Statistics Cards Row */}
                    <Grid item xs={12}>
                        <StatsContainer container spacing={3} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <EnhancedStyledPaper>
                                    <IconContainer>
                                        <img src={Students} alt="Students" />
                                    </IconContainer>
                                    <Title>
                                        Total Students
                                    </Title>
                                    <Data start={0} end={numberOfStudents} duration={2.5} />
                                    <Subtitle>Enrolled students in all classes</Subtitle>
                                </EnhancedStyledPaper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <EnhancedStyledPaper>
                                    <IconContainer>
                                        <img src={Classes} alt="Classes" />
                                    </IconContainer>
                                    <Title>
                                        Total Classes
                                    </Title>
                                    <Data start={0} end={numberOfClasses} duration={5} />
                                    <Subtitle>Active classes this semester</Subtitle>
                                </EnhancedStyledPaper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <EnhancedStyledPaper>
                                    <IconContainer>
                                        <img src={Teachers} alt="Teachers" />
                                    </IconContainer>
                                    <Title>
                                        Total Teachers
                                    </Title>
                                    <Data start={0} end={numberOfTeachers} duration={2.5} />
                                    <Subtitle>Faculty members on staff</Subtitle>
                                </EnhancedStyledPaper>
                            </Grid>
                        </StatsContainer>
                    </Grid>
                    
                    {/* Notice Board */}
                    <Grid item xs={12}>
                        <NoticeSection sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                            <NoticeTitle>Notice Board</NoticeTitle>
                            <SeeNotice />
                        </NoticeSection>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};


const StatsContainer = styled(Grid)`
  margin-bottom: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const EnhancedStyledPaper = styled(Paper)`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  height: 280px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #7f56da, #667eea, #4ecdc4);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(127, 86, 218, 0.1), rgba(102, 126, 234, 0.1));
  border-radius: 20px;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  
  ${EnhancedStyledPaper}:hover & {
    transform: scale(1.1);
  }
`;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0.5rem 0;
  letter-spacing: -0.01em;
`;

const Data = styled(CountUp)`
  font-size: 2.5rem;
  font-weight: 800;
  color: #7f56da;
  margin: 0.5rem 0;
  background: linear-gradient(135deg, #7f56da 0%, #667eea 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #718096;
  margin: 0;
  font-weight: 400;
  line-height: 1.4;
`;

const NoticeSection = styled(Paper)`
  && {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #4ecdc4, #45b7d1, #96ceb4);
    }
  }
`;

const NoticeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: -0.02em;
`;

export default AdminHomePage
