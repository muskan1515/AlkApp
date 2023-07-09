import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google';
import { Provider } from 'react-redux';

import FrontView from './components/FrontView/FrontView';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import HomePage from './components/Home/HomePage';
import Generator from './components/Generator/Generator';
import HeadingMultiMediaHorizontalSlide from './components/SlidesWidget/HeadingMultiMediaHorizontalSlides';
import HeadingMultiMediasSlide from './components/SlidesWidget/HeadingMultiMediasSlide';
import CreatePPT from './components/CreatePPT/CreatePPT';
import TitleSlide from './components/SlidesWidget/TitleSlide';
import { Backdrop } from '@mui/material';
import store from './redux/store';


const clientId = process.env.REACT_APP_CLIENT_ID;
function App() {
  return (
    <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path='/SignUp' element={<SignUp/>}></Route>
        <Route exact path='/Login' element={<Login/>}></Route>
        <Route exact path='/Home' element={<HomePage/>}></Route>
        
        <Route exact path='/CreatePPT' element={<CreatePPT/>}></Route>
        <Route exact path='/backdrop' element={<Backdrop/>}></Route>
        <Route  path='/' element={<FrontView/>}></Route>  
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
    </Provider>
    
  );
}

export default App;
