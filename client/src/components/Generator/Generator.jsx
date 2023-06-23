import React, {  useState ,useEffect, useRef} from 'react';
import {Box,Typography,Button,TextField,Link,ButtonGroup,Divider} from '@mui/material';
import axios from 'axios';
import { getImages, getText } from '../service/api';

const Generator=(props)=>{

    const textRef=useRef(null);
    const [description,setDescription]=useState('');
    const [images,setImages]=useState(null);

    const generateImages=()=>{
        const desp=textRef.current.value;

        setDescription(desp);
        console.log(desp);
        getImages({description:desp},setImages);
    }

    const generateText=()=>{
        const desp=textRef.current.value;
        getText({description:desp});
    }

   
    return (
        <Box>
        <TextField inputRef={textRef}/>
        <Button onClick={generateImages}>Generate Image</Button>
        <Button onClick={generateText}>Generate Text</Button>
        </Box>
    );
};

export default Generator;