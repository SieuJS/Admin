import React, { useEffect, useState } from 'react'
import {useHttpClient} from '../../hooks/http-hook'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';

import DetailModal from '../components/DetailModal';






function courses() {
  const {isLoading , error, sendRequest, clearError} = useHttpClient();
  const [coursesList, setCoursesList] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailCourseId, setDetailCourseId] = useState();
  const handleOpen = () => setShowDetailModal(true);
  const handleClose = () => setShowDetailModal(false);
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
  
    {
      field: 'name',
      headerName: 'Course Name',
      width: 150,
      editable : false,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
      editable : false,
    },
    {
      field: 'shortDes',
      headerName: 'Description',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable : false,
    },
    {
      field: 'dateStart',
      headerName: 'Start Date',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      editable : false,
    },
    {
      field: 'dateEnd',
      headerName: 'End Date',
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
        const onClick = (e) => {
          const currentRow = params.row;
          handleOpen();
          // return alert(JSON.stringify(currentRow, null,4));
        };
        
        return (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="warning" size="small" onClick={onClick}>Details</Button>
          </Stack>
        );
    },
  },
  ];


  useEffect (() => {
    const courseFetch  = async()=> {
      let data; 
      try {
        data = await sendRequest('http://localhost:5000/api/courses/'); 
        console.log(data.courses)
        setCoursesList(data.courses);
      }
      catch (err) {}
    }
    courseFetch();
  }, [sendRequest])
  return (
    <>
    <Box>
    <DetailModal open = {showDetailModal} onClose = {handleClose}/>
      
      <DataGrid
        rows={coursesList}
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
    </Box>
    </>
  )
}

export default courses