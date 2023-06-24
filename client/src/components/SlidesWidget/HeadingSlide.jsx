import { Box, TextField, Menu,MenuItem } from '@mui/material';
import {useState} from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { TextareaAutosize } from '@material-ui/core';

let ans='';
const propheight=900;

const HeadingSlide=()=>{
//props.height is going for box height
    
    const [elements,setElements]=useState([{
        id:1,
        type:'text',
        content:'Title'
    }]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedWidget,setWidgets]=useState(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const removeWidgets=()=>{
        const idx=selectedWidget;
        const temp=elements;
        const updatedEle=temp.filter((key,index)=>{
            if(index!=idx)
             return true;
        });
        setElements(updatedEle);
        handleClose();

    }

    const addWidgets=()=>{
        const newEle=[...elements];
        const widget={
            id:selectedWidget+1,
            type:newEle[selectedWidget].type,
            content:newEle[selectedWidget].content
        };
        newEle.splice(selectedWidget+1,0,widget);
        setElements(newEle);
        setAnchorEl(null);
    }

    const addImageWidgets=()=>{
        const newEle=[...elements];
        const widget={
            id:selectedWidget+1,
            type:'media',
            content:<ImageIcon/>
        };
        newEle.splice(selectedWidget+1,0,widget);
        setElements(newEle);
        setAnchorEl(null);
    }

    const addTextWidgets=()=>{
        const newEle=[...elements];
        const widget={
            id:selectedWidget+1,
            type:'text',
            content:'Title'
        };
        newEle.splice(selectedWidget+1,0,widget);
        setElements(newEle);
        setAnchorEl(null);
    }

    const handleContextMenu=(event,index)=>{
        event.preventDefault();
        const { clientX, clientY } = event;
        setMenuPosition({ x: clientX, y: clientY });
        setWidgets(index);
        setAnchorEl(true);

    };

    const handleClose=()=>{
        setAnchorEl(null);
    };
    

    const showMember=()=>{
        const width=100/elements.length;
        ans=elements.map((key,index)=>{
            if(key.type=='text'){
                return <Box onContextMenu={(event)=>handleContextMenu(event,index)} sx={{width:`${width}%`,height:700,backgroundColor:'gray',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}} key={index}>
                
                    <TextField sx={{height:'30%',width:'40%'}} minRows='3' placeholder={key.content}></TextField>
                    <TextField sx={{height:'30%',width:'40%',paddingTop:'-20%'}} minRows='3' placeholder='paragrph'></TextField>
               
                </Box>
            }
            else{
                return <Box onContextMenu={(event)=>handleContextMenu(event,index)} sx={{width:`${width}%`,height:700,backgroundColor:'#87CEFA',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}}  key={index}>
                   
                    <ImageIcon sx={{width:'50%',height:'50%'}}/>
                    </Box>
            }
        })
        return ans;
            
    }
    return (
        <Box sx={{display:'flex',flexDirection:'row',width:'100%',height:700,backgroundColor:'#36454F'}}>
        {showMember()}
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

export default HeadingSlide;