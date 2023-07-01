import { useState } from "react";
import { Box ,AppBar,IconButton,MenuList,Typography,Button,Toolbar,Menu,MenuItem} from "@mui/material"; 
import AddIcon from '@mui/icons-material/Add';

import TitleSlide from "../SlidesWidget/TitleSlide";
import HeadingSlide from "../SlidesWidget/HeadingSlide";
import MediaSlide from "../SlidesWidget/MediaSlide";
import HeadingMultiMediaHorizontalSlide from "../SlidesWidget/HeadingMultiMediaHorizontalSlides";
import HeadingMultiMediasSlide from "../SlidesWidget/HeadingMultiMediasSlide";
import HeadingandMediaSlide from "../SlidesWidget/Heading&MediaSlide";
import VerticalMediasSlide from "../SlidesWidget/VerticalMediasSlides";

import BackdropBox from '../helper/Backdrop';


const Slideid=["Title","Heading","Media","HeadingMultiMedia","HeadingMultiMediaHor","HeadingandMedia","VertialMedia"];
const CreatePPT=()=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentSlide,setCurrentSlide]=useState(<TitleSlide updatedHeight={600} updatedWidth={100}/>);
    const [SlideId,setSlideid]=useState(null);
    const [addtionalSideSlideCon,setSideSlideContent]=useState('');
    const [addtionalSlideCon,setSlideContent]=useState('');
    const [slides,setSlides]=useState([{
        id:1,
        title:"Title",
        array:[]
    }]);

    const SlidesName=[
        <TitleSlide updatedHeight={600} updatedWidth={100} {...addtionalSlideCon}/>,
        <HeadingSlide updatedHeight={600} updatedWidth={100} {...addtionalSlideCon}/>,
        <MediaSlide updatedHeight={600} updatedWidth={100} {...addtionalSlideCon}/>,
        <HeadingMultiMediasSlide updatedHeight={600} updatedWidth={100} {...addtionalSlideCon}/>,
        <HeadingMultiMediaHorizontalSlide updatedHeight={600} updatedWidth={100} {...addtionalSlideCon}/>,
        <HeadingandMediaSlide updatedHeight={600} updatedWidth={100} {...addtionalSlideCon}/>,
        <VerticalMediasSlide updatedHeight={600} updatedWidth={100} {...addtionalSlideCon}/>
    ];

    const SideSlidesName=[
        <Box onClick={()=>updateMainSlide(0)} ><TitleSlide updatedHeight={120} updatedWidth={100} /></Box>,
        <Box onClick={()=>updateMainSlide(1)} ><HeadingSlide updatedHeight={120} updatedWidth={100} /></Box>,
        <Box onClick={()=>updateMainSlide(2)} ><MediaSlide updatedHeight={120} updatedWidth={100} /></Box>,
        <Box onClick={()=>updateMainSlide(3)} ><HeadingMultiMediasSlide updatedHeight={120} updatedWidth={100} /></Box>,
        <Box onClick={()=>updateMainSlide(4)} ><HeadingMultiMediaHorizontalSlide updatedHeight={120} updatedWidth={100} /></Box>,
        <Box onClick={()=>updateMainSlide(5)} ><HeadingandMediaSlide updatedHeight={120} updatedWidth={100} /></Box>,
        <Box onClick={()=>updateMainSlide(6)} ><VerticalMediasSlide updatedHeight={120} updatedWidth={100} /></Box>
     ];

    const changeCurrentSlide=(value)=>{
        const temp=SlidesName.filter((key,index)=>{
            if(index==value-1)
             return true;
            
        });
        const len=slides.length;
        const updatedSlides=[...slides];
        updatedSlides.push({
            id:len+1,
            title:Slideid[value-1],
            array:[]
        });
        
        setSlides(updatedSlides);
        setCurrentSlide(temp);
        setSlideid(value-1);
        };

    const addMenuHandle=()=>{
        setAnchorEl(true);
    };
    const handleClose=()=>{
        setAnchorEl(null);
    }

    const updateMainSlide=(idx)=>{
       const temp=SlidesName[idx];
       setCurrentSlide(temp);
    }

   
    const getSlide=(title)=>{

        if(String(title)==='Title')
            return 0;
        else if(String(title)==='Heading')
            return 1;
        else if(String(title)==='Media')
            return 2;
        else if(String(title)==='HeadingMultiMedia')
            return 3;
        else if(String(title)==='HeadingMultiMediaHor')
            return 4;
            else if(String(title)==='HeadingandMedia')
            return 5;
        else
            return 6;
    };

    const showSlides=()=>{
        const temp=slides.map((key,index)=>{
             const slide=key.title;
             const idx=getSlide(slide);
             const slidesContent=SideSlidesName[idx];
             return slidesContent;
        });
        return temp;
    };

    return (
        <Box sx={{
            display:'flex',
            position:'absolute',
            flexDirection:'column',
            width: 1536,
            height: 720,
            backgroundColor: '#36454F'}}>
           <AppBar position="static">
            <Toolbar sx={{backgroundColor:'#36454F',
                        borderStyle:'hidden',
                            '&:hover': {
                                  borderStyle: 'double'
                            }
                        }}
            >
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
            <MenuList />
            </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{display:'flex',flexDirection:'row'}}>
      <Box sx={{display:'flex',flexDirection:'column'}}>
        <Box sx={{width:150,height:350,overflow:'auto',display:'flex',flexDirection:'column',borderStyle:'4px',paddingLeft:'8px',paddingRight:'8px'}}>
        {showSlides()}
        </Box>
                <Button onClick={addMenuHandle}
                    ><AddIcon sx={{borderRadius:'4px',
                    '&:hover':{
                        borderStyle:'groove'
                    }}}/></Button> 
                    <Menu 
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{overflow:'auto'}}>
                        <MenuItem  onClick={()=>changeCurrentSlide(1)}>Title</MenuItem>
                        <MenuItem  onClick={()=>changeCurrentSlide(2)}>Heading</MenuItem>
                        <MenuItem  onClick={()=>changeCurrentSlide(3)}>Media</MenuItem>
                        <MenuItem  onClick={()=>changeCurrentSlide(4)}>HeadingMultiMedia</MenuItem>
                        <MenuItem  onClick={()=>changeCurrentSlide(5)}>HeadingMultiMediaHor</MenuItem>
                        <MenuItem  onClick={()=>changeCurrentSlide(6)}>HeadingandMedia</MenuItem>
                        <MenuItem  onClick={()=>changeCurrentSlide(7)}>verticalMedia</MenuItem>
                    </Menu>  
      </Box>
      <Box sx={{width:'88%',height:654,backgroundColor:'yellow'}}>
      <Box sx={{marginTop:'40px',marginLeft:'40px', backgroundColor:'red',width:'94%',height:'90%'}}>{currentSlide}</Box>
      </Box>
      <Box sx={{width:'5%',height:654,backgroundColor:'green'}}>
      sidebar for color theme recording and adding
      </Box>
      </Box>
       </Box>
    );
}

export default CreatePPT;
