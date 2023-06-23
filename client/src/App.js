import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google';

import FrontView from './components/FrontView/FrontView';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import HomePage from './components/Home/HomePage';
import Generator from './components/Generator/Generator';
import TitleSlide from './components/SlidesWidget/TitleSlide';


const clientId = '246648691460-bsj1rub53iami1btvii0577h1on2je01.apps.googleusercontent.com';
function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path='/SignUp' element={<SignUp/>}></Route>
        <Route exact path='/Login' element={<Login/>}></Route>
        <Route exact path='/Home' element={<HomePage/>}></Route>
        <Route exact path='/Images' element={<Generator/>}></Route>
        <Route exact path='/Title' element={<TitleSlide/>}></Route>
        <Route  path='/' element={<FrontView/>}></Route>  
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
    
  );
}

export default App;
