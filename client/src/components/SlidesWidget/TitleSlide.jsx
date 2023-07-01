import { Box, TextField, Menu,MenuItem } from '@mui/material';
import {useRef, useState} from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { TextareaAutosize } from '@material-ui/core';

import {generateImages} from '../Generator/Generator';
import BackdropBox from '../helper/Backdrop';

let ans='';

const TitleSlide=({updatedHeight,updatedWidth,backdrop,content})=>{
//props.height is going for box height
    
    const [elements,setElements]=useState(content?content:[{
        id:1,
        type:'text',
        contentTitle:'',
        contentPara:''
    }]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorImageEl, setImageAnchorEl] = useState(null);
    const [selectedWidget,setWidgets]=useState(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [BackdropVisibility,setBackdropVisbility]=useState(false);
    const browseRef=useRef(null);

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

    const removeBackdrop=()=>{
        setBackdropVisbility(false);
    }

    const onChangeHandler=(event,index,val)=>{
        const changeText=event.target.value;
        const updatedElement=[...elements];
        const ele=updatedElement[index];
        if(val==0){
            updatedElement[index]={
                id:index+1,
                type:'text',
                contentTitle:changeText,
                contentPara:ele.contentPara
            };
        }
        else{
            updatedElement[index]={
                id:index+1,
                type:'text',
                contentTitle:ele.contentTitle,
                contentPara:changeText
            };
        }
        setElements(updatedElement);
    };

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
    
    const handleMenuImage=(event,index)=>{
        setWidgets(index);
        setImageAnchorEl(true);
    }

    const handleImageMenuClose=()=>{
        setImageAnchorEl(null);
    };

    const generateImage=()=>{
        setBackdropVisbility(true);
    };

    const showMember=()=>{
        const width=updatedWidth/elements.length;
        ans=elements.map((key,index)=>{
            if(key.type=='text'){
                return <Box onContextMenu={(event)=>handleContextMenu(event,index)}  sx={{width:`${width}%`,height:updatedHeight,backgroundColor:'gray',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}} key={index}>
                
                    <TextField sx={{height:'30%',width:'40%'}}onChange={(event)=>onChangeHandler(event,index,0)}  minRows='3' placeholder={key.contentTitle}></TextField>
                    <TextField sx={{height:'30%',width:'40%',paddingTop:'-20%'}} onChange={(event)=>onChangeHandler(event,index,1)} minRows='3' placeholder='paragrph'>{key.contentPara}</TextField>
               
                </Box>
            }
            else{
                return <Box onContextMenu={(event)=>handleContextMenu(event,index)} onClick={(event)=>handleMenuImage(event,index)} sx={{width:`${width}%`,height:updatedHeight,backgroundColor:'#87CEFA',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}}  key={index}>
                   
                    <ImageIcon sx={{width:'50%',height:'50%'}}/>
                    </Box>
            }
        })
        return ans;
            
    }
    return (
        <Box sx={{display:'flex',flexDirection:'row',width:{updatedWidth},height:{updatedHeight},backgroundColor:'#36454F'}}>
       
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

      <Menu
        anchorEl={anchorImageEl}
        open={Boolean(anchorImageEl)}
        onClose={handleImageMenuClose}
      >
        <MenuItem type='file'>Browse</MenuItem> 
        <TextField inputRef={browseRef} sx={{visibility:'hidden',height:'2px'}}/>
        <MenuItem onClick={generateImage}>Generate Image</MenuItem>
      </Menu>
      {BackdropVisibility ? <BackdropBox removeBackdrop={removeBackdrop} change={BackdropVisibility} setBackdropVisibility={setBackdropVisbility}/>:''}
       
        </Box>
    );
}

export default TitleSlide;