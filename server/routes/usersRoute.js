const express=require('express');
const router=express.Router();
const passport=require('passport');
console.log('in routes');

const userController=require('../controller/userController');
router.post("/register",userController.register);
router.post("/login",userController.login);
//router.post("/forgotPassword", userController.forgotPassword);
module.exports=router;

    
