const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    console.log(req.cookies);
    if(req.cookies.nickName){
        res.render ('index',{
            nickName:req.cookies.nickName
        });
    }else{
        res.redirect('/login.html');
    }
})

router.get('/login.html',(req,res) =>{
    res.render('login')
})

router.get('/register.html',(req,res) =>{
    res.render('register')
})



module.exports = router;