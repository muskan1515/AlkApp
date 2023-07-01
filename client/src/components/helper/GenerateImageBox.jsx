import { Box,Button,Search, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useRef, useState } from 'react';
import greentick from '../Images/greentick.jpg'

import { generateImages } from "../Generator/Generator";
import { getImages } from "../service/api";

import axios from 'axios';
const url=process.env.REACT_APP_BACKEND_HOST;

const GenerateImageBox=({setBackdropVisibility})=>{

    const descriptionref=useRef(null);
    const [Images,setImages]=useState([]);
    const [spinner,setSpinner]=useState(false);
    const [show,setShow]=useState(<Typography>No Images to Load</Typography>);
    
    
    
    const getimages=async()=>{
       try {
            const text = descriptionref.current.value;
            const res = await axios.post(`${url}/openAI/Images`, { description: text });
            setImages(res.data);
            const images=Images.map((key,index)=>{
                return <img key={index} src={key.url} alt="image" sx={{width:40,height:40,paddingLeft:'4px',paddingTop:'6px'}}/>
            });
            setShow(images);
        } catch (err) {
            if (err.response && err.response.status === 429) {
                const retryDelay = 1000;
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                getimages();
            } 
            else {
            console.log(err);
            }
        }
    };

    const changeVisibility=()=>{
        setBackdropVisibility(false);
    }


    return (
        <Box sx={{backgroundColor:'#ADADC9',height:500, width:380,position:'relative'}}>
            <Box sx={{display:'flex',flexDirection:'row',paddingTop:'8px',paddingLeft:'6px'}}>
                <TextField inputRef={descriptionref} sx={{paddinfTop:'2px',paddingLeft:'2px',borderStyle:'4px',height:'8%',width:'80%'}}/>
                <Button onClick={getimages}><SearchIcon/></Button>
            </Box>
            <Box sx={{width:'88%',height:'74%',overflow:'auto',marginTop:'16px',marginLeft:'20px'}}>
                {show}
            </Box>
            <Button onClick={changeVisibility} sx={{width:'100%'}}>Cancel</Button>  
        </Box>
    );
};


export default GenerateImageBox;