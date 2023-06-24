import axios from 'axios';
const url=process.env.REACT_APP_BACKEND_HOST;

export const getGoogleLogin=(data,setErrorText)=>{
    axios.post(`${url}/auth/GoogleLogin`,data).then(res=>{
        setErrorText("");
    }).
    catch(err=>{
        setErrorText("Google Login is failed due to email either Password!");
    });
}

export const getGoogleSignup=(data,setErrorText)=>{
    axios.post(`${url}/auth/GoogleSignUp`,data).then(res=>{
        setErrorText("");
    }).
    catch(err=>{
        setErrorText("Google SignUp is failed due to email either Password!");
    });
}

export const getSignup=(data,setErrorText)=>{
    axios.post(`${url}/auth/SignUp`,data).then(res=>{
        setErrorText("");
    }).
    catch(err=>{
        setErrorText("Login Failed due Wrong Password or email!");
    });
}

export const getLogin=(data,setErrorText)=>{
    axios.post(`${url}/auth/Login`,data).then(res=>{
        setErrorText("");
    }).
    catch(err=>{
        setErrorText("Login Failed due Wrong Password or email!");
    });
}

export const getImages=(data,setImages)=>{
    axios.post(`${url}/openAI/Images`,data).then(res=>{
        console.log(res);
        setImages(res);

    }).
    catch(err=>{
            console.log(err);
    })
}

export const getText=(data)=>{
    axios.post(`${url}/openAI/Texts`,data).then(res=>{
        console.log(res);

    }).
    catch(err=>{
            console.log(err);
    })
}