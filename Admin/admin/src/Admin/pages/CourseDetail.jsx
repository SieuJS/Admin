import React, { useEffect, useState } from 'react';

import { Card, CardContent, Typography, Button , Box, InputLabel, Input, FormHelperText} from '@mui/material';
import { Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner  from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../components/ErrorModal'
import FormControl from '@mui/material/FormControl';

const styles = {
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      margin: '20px',
    },
    generalInfoCard: {
      gridColumn: 'span 2',
    },
    assignmentTableCard: {
      gridColumn: '1 / span 1',
    },
    studentTutorTableCard: {
      gridColumn: '2 / span 1',
    },
    button: {
      marginTop: '1rem',
    },
  };

const CoursePage = () => {
  const courseId = useParams().courseId;

  const [course, setCourse] = useState(undefined);
  const [studentList, setStudentList ] = useState(undefined);
    const [addStudentEmail, setAddStudentEmail] = useState('');



   const {isLoading, error, sendRequest, clearError} = useHttpClient();


   const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
  
    {
      field: 'name',
      headerName: 'Student\'s Name',
      width: 150,
      editable : false,
    },

    {
      field: 'email',
      headerName: 'Email',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable : false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {


        const onClick = async (e) => {
          const currentStudentId = params.row._id;
          console.log(currentStudentId)

            try{ await sendRequest('http://localhost:5000/api/admin/course/deleteStudent', "POST", {'Content-Type': 'application/json'}, JSON.stringify({
                // username: formState.inputs.name.value,
                courseId, studentId : currentStudentId
            }))
            }
            catch(err) {
                return 
            }
            setStudentList(prev => {
                return prev.filter(student => {
                    return student._id !== currentStudentId
                })
            })
        //   return navigate(`/course/${currentRow._id}`)
        };
        
        return (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="warning" size="small" onClick={onClick} >Remove</Button>
          </Stack>
        );
    },
  },
  ];

  useEffect (() => {
    const CourseFetch = async () => {
        let data; 
        try {
            if(!course)
            {
            data = await sendRequest(`http://localhost:5000/api/courses/${courseId}`)
            setCourse(data.course);
            }
            else if(!studentList){
                console.log('sent')
                data = await sendRequest(`http://localhost:5000/api/student/getList`, "POST", {'Content-Type': 'application/json'}, JSON.stringify({
                    // username: formState.inputs.name.value,
                    idList : course.students
                }))
                console.log(data)
                setStudentList(data.students)
            }

        }catch (eerr){}
    }
    CourseFetch();
  }, [sendRequest, course])

  const addStudent = async () => {
    let data 
    try{ data = await sendRequest('http://localhost:5000/api/admin/course/addStudent', "POST", {'Content-Type': 'application/json'}, JSON.stringify({
                // username: formState.inputs.name.value,
                courseId, studentEmail : addStudentEmail
            }))
            }
            catch(err) {
                return 
            }
    if (!data.student) return  
    const addStudent = data.student;
    setStudentList(prev => ([...prev,addStudent]));

  }

  return (
    <>
    <Card style={styles.root}>
    {isLoading && <LoadingSpinner asOverlay/>}
    {<ErrorModal error = {error} onClear = {clearError}/>}
    {course && 
      <CardContent style={styles.content}>
      <Typography variant="h5" component="h2">
        {course.name}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {course.shortDes}
      </Typography>
      <Typography variant="body1" component="p">
        {course.fullDes}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Price: ${course.price}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Start Date: {course.dateStart}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        End Date: {course.dateEnd}
      </Typography>
    </CardContent>
    }
    </Card>
    
    <div className="studentList">
        <h2>Student enrolled</h2>
    <Box>
        {
            studentList &&
      <DataGrid
        rows={studentList}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    }
    <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" onChange={(e) => {setAddStudentEmail(e.target.value)}} aria-describedby="my-helper-text" />
  <Button variant="outlined" color="primary" size="small" onClick = {addStudent}>Add student</Button>

</FormControl>
    </Box>
    </div>

    </>

  );
};

export default CoursePage;
