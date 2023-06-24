import React, {  useState ,useEffect, useRef} from 'react';
import {Box,Typography,Button,TextField,Link,ButtonGroup,Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import DomainIcon from '@mui/icons-material/Domain';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const HomePage=(props)=>{

  const navigate=useNavigate();
  const redirectToCreatePage=()=>{
    navigate('/CreatePPT');
  }
    return (
        <Box
        sx={{
          width: 1536,
          height: 721,
          backgroundColor: '#36454F',
          display:'flex',
          flexDirection:'row' 
        }}
      >
        <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
          },
        }}
        >
          <ButtonGroup sx={{width:180,height:680,backgroundColor:'#010203',marginTop:'16px'}}
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
        >
        <Button sx={{marginTop:'6px',marginLeft:'8px',width:'90%',height:'9%',backgroundColor:'#010203',":hover":{
          backgroundColor:'#808080'
        },borderRadius:'4px'}} > name</Button>
        <Button sx={{marginTop:'6px',marginLeft:'8px',width:'90%',height:'8%',backgroundColor:'#010203',":hover":{
          backgroundColor:'#808080'
        },fontWeight:'2px'}} variant="contained" startIcon={<NotificationsIcon />}>notifications</Button>
        <Button sx={{marginTop:'6px',marginLeft:'8px',width:'90%',height:'8%',backgroundColor:'#010203',":hover":{
          backgroundColor:'#808080'
        }}} variant="contained" startIcon={<AccessTimeFilledIcon />}>Recents</Button>
        <Button sx={{marginTop:'6px',marginLeft:'8px',width:'90%',height:'8%',backgroundColor:'#010203',":hover":{
          backgroundColor:'#808080'
        }}} variant="contained" startIcon={<AccountCircleIcon />}>Personals</Button>
        <Button sx={{marginTop:'6px',marginLeft:'8px',width:'90%',height:'8%',backgroundColor:'#010203',":hover":{
          backgroundColor:'#808080'
        }}} variant="contained" startIcon={<GroupIcon />}>Shared with me</Button>
        <Button sx={{marginTop:'6px',marginLeft:'8px',width:'90%',height:'8%',backgroundColor:'#010203',":hover":{
          backgroundColor:'#808080'
        }}} variant="contained" startIcon={<DomainIcon />}>workspace</Button>
        <Button sx={{marginTop:'6px',marginLeft:'8px',width:'90%',height:'8%',backgroundColor:'#010203',":hover":{
          backgroundColor:'#808080'
        }}} variant="contained" startIcon={<DeleteIcon />}>delete</Button>
        <Button sx={{marginTop:'6px',marginLeft:'8px',width:'90%',height:'8%',backgroundColor:'#010203',":hover":{
          backgroundColor:'#808080'
        }}} variant="contained" startIcon={<PersonAddIcon />}>Invite</Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ backgroundColor:'#99adbe',width:1320,height:680,marginTop:'16px',overflow:'auto'}}>
      <Button  sx={{marginTop:'8px',marginLeft:'86%'}} variant="contained" startIcon={<CreateIcon />} 
      onClick={redirectToCreatePage}
      >Create</Button>
      </Box>
    </Box>
    );
};

export default HomePage;