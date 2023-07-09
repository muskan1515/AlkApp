import { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { Box ,AppBar,IconButton,MenuList,Typography,Button,Toolbar,Menu,MenuItem} from "@mui/material"; 
import AddIcon from '@mui/icons-material/Add';

import TitleSlide from "../SlidesWidget/TitleSlide";
import HeadingSlide from "../SlidesWidget/HeadingSlide";
import MediaSlide from "../SlidesWidget/MediaSlide";
import HeadingMultiMediaHorizontalSlide from "../SlidesWidget/HeadingMultiMediaHorizontalSlides";
import HeadingMultiMediasSlide from "../SlidesWidget/HeadingMultiMediasSlide";
import HeadingandMediaSlide from "../SlidesWidget/Heading&MediaSlide";
import VerticalMediasSlide from "../SlidesWidget/VerticalMediasSlides";
import { setSlideData } from "../../redux/reducers/slideSlice";

const CreatePPT=()=>{
    
    const Dispatch = useDispatch();
    const data=useSelector(state=>state);
    const [anchorEl, setAnchorEl] = useState(null);
    const [getData,setGetData]=useState(false);
    const [slides,setSlides]=useState([{
        id:1,
        title:<TitleSlide idx={1} updatedHeight={600} updatedWidth={100}  />,
        array:[]
    }]);
    Dispatch(setSlideData({payload:slides}));
    const [currentSlide,setCurrentSlide]=useState(<TitleSlide idx={1} updatedHeight={600} updatedWidth={100} slide={slides} />);
    const [count,setCount]=useState(2);
    
   const [tempSlides,setTempSlide]=useState([1]);
    const [sideSlides,setSideSlides]=useState([{
        id:1,
        data:<Box onClick={()=>{
            const slidestemp=[...tempSlides];
            slidestemp.push(1);
            setTempSlide(slidestemp);}}><TitleSlide idx={1} updatedHeight={120} updatedWidth={100} /></Box>
   }]);
 
   useEffect(()=>{
    const len=tempSlides.length;
    const ele=tempSlides[len-1];
    const temp=slides.map((key,index)=>{
        if(key.id==ele){
        setCurrentSlide(key.title);
        return;}
    })
   },[tempSlides]);

//    useEffect(()=>{
//     const data=useSelector(state=>state);
//     const len=tempSlides.length;
//     const idx=tempSlides[len-1];
//     console.log(data[idx]);
//     setGetData(false);
//    },[getData===true]);

    const getMainSlides=(idx,array)=>{ 
        
        if(idx==0)
        return <TitleSlide  updatedHeight={600} updatedWidth={100} {...array} />
        else if(idx==1)
        return <HeadingSlide  updatedHeight={600} updatedWidth={100} {...array}/>
        else if(idx==2)
        return <MediaSlide  updatedHeight={600} updatedWidth={100} {...array}/>
        else if(idx==3)
        return <HeadingMultiMediasSlide  updatedHeight={600} updatedWidth={100} {...array}/>
        else if(idx==4)
        return <HeadingMultiMediaHorizontalSlide  updatedHeight={600} updatedWidth={100} {...array}/>
        else if(idx==5)
        return <HeadingandMediaSlide  updatedHeight={600} updatedWidth={100} {...array}/>
        else
        return <VerticalMediasSlide  updatedHeight={600} updatedWidth={100} {...array}/>
    }

    const onClickSideSlides=(idx)=>{
        const slidestemp=[...tempSlides];
        slidestemp.push(idx);
        setTempSlide(slidestemp);
        console.log(data);
    }
    
    const getSideSlides=(idx)=>{ 
        const key=count;
        
        
        setCount(Number(key)+1); 

        const slidestemp=[...tempSlides];
        const slideProps = {
            idx: key,
            updatedHeight: 120,
            updatedWidth: 100
        };

        if(idx==0)
        return <Box onClick={()=>onClickSideSlides(key)}><TitleSlide {...slideProps} /></Box>
        else if(idx==1)
        return <Box onClick={()=>onClickSideSlides(key)}><HeadingSlide {...slideProps} /></Box>
        else if(idx==2)
        return <Box onClick={()=>onClickSideSlides(key)}><MediaSlide {...slideProps} /></Box>
        else if(idx==3)
        return <Box onClick={()=>onClickSideSlides(key)}><HeadingMultiMediasSlide {...slideProps} /></Box>
        else if(idx==4)
        return <Box onClick={()=>onClickSideSlides(key)}><HeadingMultiMediaHorizontalSlide {...slideProps} /></Box>
        else if(idx==5)
        return <Box onClick={()=>onClickSideSlides(key)}><HeadingandMediaSlide {...slideProps} /></Box>
        else
        return <Box onClick={()=>onClickSideSlides(key)}><VerticalMediasSlide {...slideProps} /></Box>
    }

    const changeCurrentSlide=(value)=>{
        const temp=getMainSlides(value-1);
        const len=slides.length;
        const updatedSlides=[...slides];
        const data=getMainSlides(value-1);
        updatedSlides.push({
            id:len+1,
            title:data,
            array:[]
        });
        
        setSlides(updatedSlides);
        setCurrentSlide(temp);
        const oldSideSlides=[...sideSlides];
        const tmp2=getSideSlides(value-1);
        oldSideSlides.push({
            id:len+1,
            data:tmp2
        })
        setSideSlides(oldSideSlides);
        Dispatch(setSlideData({payload:slides,index:len+1,text:"Create"}));
        };

    const addMenuHandle=()=>{
        setAnchorEl(true);
    };
    const handleClose=()=>{
        setAnchorEl(null);
    }

    const showSlides=()=>{
        const temp=sideSlides.map((key,index)=>{
            return key.data;
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
      <Box sx={{marginTop:'40px',marginLeft:'40px', backgroundColor:'red',width:'94%',height:'90%'}}>
      {currentSlide}
      </Box>
      </Box>
      <Box sx={{width:'5%',height:654,backgroundColor:'green'}}>
      sidebar for color theme recording and adding
      </Box>
      </Box>
       </Box>
    );
}

export default CreatePPT;
