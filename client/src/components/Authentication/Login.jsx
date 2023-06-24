import React, {  useState ,useEffect, useRef} from 'react';
import {Box,Typography,Button,TextField,Link,IconButton,InputAdornment} from '@mui/material';
import {GoogleLogin} from '@react-oauth/google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate } from 'react-router-dom';

import greentick from '../Images/greentick.jpg';
import redcross from '../Images/redcross.jpg';
import {getLogin,getGoogleLogin} from '../service/api';


const url=process.env.FRONTEND_HOST;

const SignUp=(props)=>{

  const navigate=useNavigate();
  const passwordRef=useRef(null);
  const emailRef=useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailAuth,setEmailAuth]=useState(1);
  const [passwordAuth,setPasswordAuth]=useState(1);
  const [ErrorText,setErrorText]=useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onLoginSuccess=(res)=>{
    const data=res;
    getGoogleLogin(data,setErrorText);
    if(ErrorText=="")
      navigate('/Home');
  };
  const onLoginFailure=()=>{
    setErrorText("Google Login is failed due to Google Authenticator!");
  };

  const checkPassword=(e)=>{
    const regexPassword= /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/  ;
    const password=e.target.value;
    if(regexPassword.test(password)){
      setPasswordAuth(2);
    }
    else{
      setPasswordAuth(3);
    }
  };

  const checkEmail=(e)=>{
    const regexEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ;
    const email=e.target.value;
    if(regexEmail.test(email)){
      setEmailAuth(2);
    }
    else{
      setEmailAuth(3);
    }
  };

  const Login=()=>{
    const email=emailRef.current.value;
    const password=passwordRef.current.value;
    if(passwordAuth ===2 && emailAuth===2){
      const data={
        email:email,
        password:password
      };
      getLogin(data,setErrorText);
      if(ErrorText=="")
        navigate('/Home');
    }
    else{
      setErrorText("Login Failed due Incorrect Password or Email entered!");
    }
  }

    return(
        <Box
        sx={{
          width: 1536,
          height: 721,
          backgroundColor: '#36454F',
          display:'flex',
          flexDirection:'column' 
        }}
      >
      <Box sx={{width:200,height:30,color:'red',fontWeight:2,marginLeft:'42%',paddingTop:'2%'}}>{ErrorText}</Box>
     <Box sx={{
        marginTop:'10%',
        marginLeft:'42%',
        paddingTop:'4px'
    }}>  
    <GoogleLogin buttonText="SignUp with Google"  onSuccess={onLoginSuccess} onError={onLoginFailure}/></Box>
        <Typography variant="h7" component="h3" sx={{marginTop:'4px'}}>or</Typography>
        <TextField  
        sx={{backgroundColor:'#36454F',
            marginTop:'2%',
            width:'20%',
            marginLeft:'40%',
            
        }} label="Email"
        variant="outlined"
        placeholder='Enter Email' onChange={checkEmail} inputRef={emailRef}></TextField>
        <TextField 
        sx={{backgroundColor:'#36454F',
        marginTop:'2%',
        marginLeft:'40%',
        width:'20%'
        }}
        
        autoComplete="current-password" placeholder='Enter Password' 
        onChange={checkPassword} inputRef={passwordRef}
        type={showPassword ? 'text' : 'password'}
        label="Password"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}></TextField>
        <Box sx={{whiteSpace:'nowrap'}}>
        {emailAuth==1?"":<Box component='img' sx={{height:'14px',width:'14px',paddingTop:'6px',marginLeft:'',display:'inline'}} src={(emailAuth==2?greentick:emailAuth==1?"":redcross)} alt=''/>}
        <Typography sx={{fontSize:12,paddingLeft:'8px',display:'inline'}}>{emailAuth==2?"Email is Correct":emailAuth==1?"":"Email is Not Correct"}</Typography>
        </Box>
        <Box sx={{whiteSpace:'nowrap'}}>
        {passwordAuth==1?"":<Box component='img' sx={{height:'14px',width:'14px',paddingTop:'6px',marginLeft:'',display:'inline'}} src={passwordAuth==2?greentick:passwordAuth==1?"":redcross} alt=''/>}
        <Typography sx={{fontSize:12,paddingLeft:'8px',display:'inline'}}>{passwordAuth==2?"Password is Correct":passwordAuth==1?"":"Password must be 0f 6 "}</Typography>
        </Box>
        <Link href='/' sx={{marginTop:'6px',paddingLeft:'2px',color:'black'}}>Forgot Password?</Link>
        <Button sx={{
            color: '#99adbe',
            marginTop:'2%',
            width:'20%',
            height:'8%',
            backgroundColor:'black',
            marginLeft:'40%',
            borderRadius:'10px'
        }} onClick={Login}>Continue</Button>
        <Box sx={{display:'flex',
                  flexDirection:'row'}}>
        <Typography sx={{marginTop:'6px',marginLeft:'40%'}}>No Account </Typography>
        <Link href='http://localhost:3000/SignUp' sx={{marginTop:'4px',marginLeft:'1%',color:'black'}}>Create One</Link>
        </Box>
      </Box>
    );
};

export default (SignUp);