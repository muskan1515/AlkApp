import React, { Component } from 'react';
import {Box,Typography,Button,AppBar,IconButton,Toolbar, MenuItem, MenuList,Link,InputLabel, Select} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import './FrontView.css';
const url='http://localhost:3000/';


const FrontView=(props)=>{



    const getSignupPage=()=>{
        window.open(url+'Login');
    }

    return(
        <Box
        sx={{
          width: 1536,
          height: 721,
          backgroundColor: '#36454F',
          opacity: [0.9, 0.8, 0.7],
          '&:hover': {
            backgroundColor: '#36454F',
            opacity:1,
          },
        }}
      >
      <Box sx={{ flexGrow: 1 ,
                 backgroundColor:'#010203'}}>
      <AppBar position="static" sx={{backgroundColor:'#010203'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 ,marginLeft:'36%'}}
          >
            <MenuList sx={{
                display:'flex',
                marginLeft:'40%',
                color:'#99adbe',
                '&:hover':{
                    color:'white'
                }
            }} >
            <MenuItem 
            sx={{color:'white'}}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value=''
              label="Products"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </MenuItem>
            <MenuItem>Template</MenuItem>
            <MenuItem>Blog</MenuItem>
            </MenuList>
          </IconButton>
          <Button color="inherit" sx={{marginLeft:'34%',color:'#99adbe','&:hover':{
            backgroundColor:'#36454F',color:'white'
          }}} onClick={getSignupPage}>Sign In</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Typography variant="h2" component="h3" sx={{
        color: '#99adbe',
        paddingTop:'15%',
        opacity: [0.9, 0.8, 0.7],
        '&:hover': {
          color: '#99adbe',
          opacity:1
        },}}
        >The New Way of </Typography>
        <Typography  variant="h3" component="h3" sx={{
            color: 'black',
            opacity: [0.9, 0.8, 0.7],
            '&:hover': {
              color: 'black',
              opacity:1
            },}}>Story Telling.</Typography>
            <Typography variant="h5" component="h4" sx={{
                color: '#99adbe',
                paddingTop:'2%'
            }}>AI based application For fast and easy work </Typography>
        <Button sx={{
            color: '#99adbe',
            marginTop:'2%',
            '&:hover':{
                backgroundColor:'black'
            },
        }} onClick={getSignupPage}>Start</Button>
      </Box>
    );
};

export default FrontView;