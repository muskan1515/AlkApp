import { Box, TextField, Menu,MenuItem } from '@mui/material';
import {useState} from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { TextareaAutosize } from '@material-ui/core';

let ans='';
const propheight=900;

const HeadingMultiMediasSlide=()=>{
//props.height is going for box height
    
    const [Upperelements,setUpperElements]=useState([{
        id:1,
        row:1,
        type:'text',
        content:'Heading'
    }]);
    const [elements,setElements]=useState([{
        id:1,
        row:2,
        type:'media',
        content:<ImageIcon/>
    },
    {
        id:2,
        row:2,
        type:'media',
        content:<ImageIcon/>
    },
    {
        id:3,
        row:2,
        type:'media',
        content:<ImageIcon/>
    }]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedWidget,setWidgets]=useState(null);
    const [row,setRow]=useState(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const removeWidgets=()=>{
        const idx=selectedWidget;
        const temp=(row==1?[...Upperelements]:[...elements]);
        const updatedEle=temp.filter((key,index)=>{
            if(index!=idx)
             return true;
        });
        setRow(null);
        setWidgets(null);
        if(row==1)
         setUpperElements(updatedEle);
        else
         setElements(updatedEle);
        handleClose();

    }

    const addWidgets=()=>{
        const newEle=(row==1?[...Upperelements]:[...elements]);
        const widget={
            id:selectedWidget+1,
            row:row,
            type:newEle[selectedWidget].type,
            content:newEle[selectedWidget].content
        };
        newEle.splice(selectedWidget+1,0,widget);
        if(row==1)
         setUpperElements(newEle);
        else
         setElements(newEle);
        setRow(null);
        setWidgets(null);
        setAnchorEl(null);
    }

    const addImageWidgets=()=>{
        const newEle=(row==1?[...Upperelements]:[...elements]);
        const widget={
            id:selectedWidget+1,
            row:row,
            type:'media',
            content:<ImageIcon/>
        };
        newEle.splice(selectedWidget+1,0,widget);
        if(row==1)
         setUpperElements(newEle);
        else
         setElements(newEle);
        setRow(null);
        setWidgets(null);
        setAnchorEl(null);
    }

    const addTextWidgets=()=>{
        const newEle=(row==1?[...Upperelements]:[...elements]);
        const widget={
            id:selectedWidget+1,
            row:row,
            type:'text',
            content:'Heading'
        };
        newEle.splice(selectedWidget+1,0,widget);
        if(row==1)
         setUpperElements(newEle);
        else
         setElements(newEle);
        setRow(null);
        setWidgets(null);
        setAnchorEl(null);
    }

    const handleContextMenu=(event,index,row)=>{
        event.preventDefault();
        const { clientX, clientY } = event;
        setMenuPosition({ x: clientX, y: clientY });
        setWidgets(index);
        setRow(row);
        setAnchorEl(true);

    };

    const handleClose=()=>{
        setAnchorEl(null);
    };
    

    const showMemberLower=()=>{
        const width=100/elements.length;
        ans=elements.map((key,index)=>{
            if(key.type=='text'){
                return <Box onContextMenu={(event)=>handleContextMenu(event,index,key.row)} sx={{width:`${width}%`,height:500,backgroundColor:'orange',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}} key={index}>
                
                    <TextField sx={{height:'30%',width:'40%'}} minRows='3' placeholder={key.content}></TextField>
                    <TextField sx={{height:'30%',width:'40%',paddingTop:'-20%'}} minRows='3' placeholder='paragrph'></TextField>
               
                </Box>
            }
            else{
                return <Box onContextMenu={(event)=>handleContextMenu(event,index,key.row)} sx={{width:`${width}%`,height:500,backgroundColor:'orange',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}}  key={index}>
                   
                    <ImageIcon sx={{width:'50%',height:'50%'}}/>
                    </Box>
            }
        })
        return ans;
    }
    const showMemberUpper=()=>{
        const width=100/Upperelements.length;
        ans=Upperelements.map((key,index)=>{
            if(key.type=='text'){
                return <Box onContextMenu={(event)=>handleContextMenu(event,index,key.row)} sx={{width:`${width}%`,height:600,backgroundColor:'gray',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}} key={index}>
                
                    <TextField sx={{height:'30%',width:'40%'}} minRows='3' placeholder={key.content}></TextField>
                    <TextField sx={{height:'30%',width:'40%',paddingTop:'-20%'}} minRows='3' placeholder='paragrph'></TextField>
               
                </Box>
            }
            else{
                return <Box onContextMenu={(event)=>handleContextMenu(event,index,key.row)} sx={{width:`${width}%`,height:600,backgroundColor:'gray',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}}  key={index}>
                   
                    <ImageIcon sx={{width:'50%',height:'50%'}}/>
                    </Box>
            }
        })
        return ans;
    }
    return (
        <Box sx={{display:'flex',flexDirection:'column',width:'100%',height:'auto',backgroundColor:'#36454F'}}>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        {showMemberUpper()}
        </Box>
        <Box sx={{display:'flex',flexDirection:'row'}}>
        {showMemberLower()}
        </Box>
        <Menu sx={{top:`${menuPosition.y}`,left:`${menuPosition.x}`}}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={addTextWidgets}>Add Text Tile</MenuItem>
        <MenuItem onClick={addImageWidgets}>Add Image Tile</MenuItem>
        <MenuItem onClick={removeWidgets}>Delete</MenuItem>
        <MenuItem onClick={addWidgets}>Duplicate</MenuItem>
      </Menu>
        </Box>
    );
}

export default HeadingMultiMediasSlide;