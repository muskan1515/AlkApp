import { Box, TextField, Avatar } from '@mui/material';
import {useState} from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { TextareaAutosize } from '@material-ui/core';

let ans='';
const propheight=900;

const TitleSlide=()=>{
//props.height is going for box height
    
    const [elements,setElements]=useState([{
        id:1,
        type:'text',
        content:'Title'
    },
    {
        id:2,
        type:'media',
        content:ImageIcon
    },
    {
        id:2,
        type:'media',
        content:ImageIcon
    }]);


    const removeWidgets=(idx)=>{
        const temp=elements;
        const updatedEle=temp.filter((key,index)=>{
            if(index!=idx)
             return true;
        });
        setElements(updatedEle);

    }
    

    const showMember=()=>{
        const width=100/elements.length;
        ans=elements.map((key,index)=>{
            if(key.type=='text'){
                return <Box sx={{width:`${width}%`,height:700,backgroundColor:'gray',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}} onClick={()=>removeWidgets(index)} key={index}>
                
                    <TextField sx={{height:'30%',width:'40%'}} minRows='3' placeholder={key.content}></TextField>
                    <TextField sx={{height:'30%',width:'40%',paddingTop:'-20%'}} minRows='3' placeholder='paragrph'></TextField>
               
                </Box>
            }
            else{
                return <Box sx={{width:`${width}%`,height:700,backgroundColor:'#87CEFA',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}} onClick={()=>removeWidgets(index)} key={index}>
                   
                    <ImageIcon sx={{width:'50%',height:'50%'}}/>
                    </Box>
            }
        })
        return ans;
            
    }
    return (
        <Box sx={{display:'flex',flexDirection:'row',width:'100%',height:700,backgroundColor:'#36454F'}}>
        {showMember()}
        </Box>
    );
}

export default TitleSlide;