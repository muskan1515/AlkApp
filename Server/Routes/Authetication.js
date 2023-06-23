const express=require('express');

const authController=require('../Controller/authenticationController');
const router=express.Router();

router.post('/Login',authController.getLogin);

router.post('/SignUp',authController.getSignup);

router.post('/GoogleLogin',authController.getGoogleLogin);

router.post('/GoogleSignUp',authController.getGoogleSignup);

module.exports=router;