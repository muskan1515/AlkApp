import { Box, TextField, Menu,MenuItem } from '@mui/material';
import {useState,useRef} from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { TextareaAutosize } from '@material-ui/core';

import BackdropBox from '../helper/Backdrop';
let ans='';
const propheight=900;

const VerticalMediasSlide=({updatedHeight,updatedWidth,content})=>{
//props.height is going for box height
    
    const [elements,setElements]=useState(content?content:[{
        id:1,
        type:'media',
        content:<ImageIcon/>
    },
    {
        id:2,
        type:'media',
        content:<ImageIcon/>
    },
    {
        id:3,
        type:'media',
        content:<ImageIcon/>
    }]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorImageEl, setImageAnchorEl] = useState(false);
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
            contentTitle:'Title',
            contentPara:'Paragraph'
        };
        newEle.splice(selectedWidget+1,0,widget);
        setElements(newEle);
        setAnchorEl(null);
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

    const removeBackdrop=()=>{
        setBackdropVisbility(false);
    }

    const browseImage=()=>{
        const file=browseRef.current.files[0];
        const reader=new FileReader();
        let imageURL='';
        reader.onload=(e)=>{
            imageURL=e.target.result;
            const oldEle=elements;
            const updated=oldEle[selectedWidget];
            oldEle[selectedWidget]={
                id:updated.id,
                type:updated.type,
                content:<img src={imageURL} width={'100%'} height={'100%'}/>
            };
            setElements(oldEle);
        }
        reader.onerror=(e)=>{
            console.error("There is an error",e);
        }
        reader.readAsDataURL(file);
       
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
        const width=updatedWidth/elements.length;
        ans=elements.map((key,index)=>{
            if(key.type=='text'){
                return <Box onContextMenu={(event)=>handleContextMenu(event,index)} sx={{width:`${width}%`,height:updatedHeight,backgroundColor:'gray',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}} key={index}>
                
                    <TextField sx={{height:'30%',width:'40%'}} minRows='3' onChange={(event)=>onChangeHandler(event,index,0)} placeholder={key.contentTitle}></TextField>
                    <TextField sx={{height:'30%',width:'40%',paddingTop:'-20%'}} minRows='3' onChange={(event)=>onChangeHandler(event,index,1)} placeholder={key.contentPara}></TextField>
               
                </Box>
            }
            else{
                return <Box onContextMenu={(event)=>handleContextMenu(event,index)} onClick={(event)=>handleMenuImage(event,index)} sx={{width:`${width}%`,height:updatedHeight,backgroundColor:'#87CEFA',display: 'flex',flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',borderStyle:'double' ,borderColor:'black'}}  key={index}>
                   
                { key.content?key.content:<ImageIcon sx={{width:'50%',height:'50%'}}/>}
                    </Box>
            }
        })
        return ans;
            
    }
    return (
        <Box sx={{display:'flex',flexDirection:'row',width:`${updatedWidth}`,height:updatedHeight,backgroundColor:'#36454F'}}>
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
      <MenuItem variant="contained"
      component="label" >Browse
      <input
          ref={browseRef}
          hidden
          type='file'
          onChange={browseImage}
      />
      </MenuItem> 
      
      <MenuItem onClick={generateImage}>Generate Image</MenuItem>
    </Menu>
    {BackdropVisibility ? <BackdropBox removeBackdrop={removeBackdrop} change={BackdropVisibility} setBackdropVisibility={setBackdropVisbility}/>:''}
     
        </Box>
    );
}

export default VerticalMediasSlide;