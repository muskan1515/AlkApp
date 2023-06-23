const express=require('express');

const authController=require('../Controller/openAIController');
const router=express.Router();

router.post('/Images',authController.getImages);

router.post('/Texts',authController.getTexts);

module.exports=router;