const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../modles/userModel');
const router = express.Router();

router.post('/register',(req,res) =>{

    let username = req.body.username;
    let password = req.body.password;
    
    bcrypt.hash(password, 10).then(saltPassword => {
        let user = new UserModel({
            username: username,
            password: saltPassword
        })
    
        user.save()
            .then(() => { 
            console.log('注册成功');
            res.redirect('/login.html');
            })
            .catch(error => { 
            console.log('写入失败');
            res.send('注册失败');
            });
    })
})

router.post('/login',(req,res) =>{
    let username = req.body.username;
    let password = req.body.password;

    //验证用户名是否存在
    UserModel.findOne({
        username
    }).then(data => {
        if (!data){
            // 用户不存在
            res.send({
                code:-1,
                meg: '用户名不存在'
            })
        }else{
            // 用户存在，判断密码是否正确
            bcrypt.compare(password,data.password,(err,isOk) =>{
               if(isOk) {
                 // 跳转会首页之前，将用户的昵称与is_admin写入到session中
                    req.session.nickName = data.nickName;
                    req.session.isAdmin = data.is_admin;
                    res.redirect('/');
               } else {
                res.send({
                    code: -2,
                    msg: '密码错误'
                })
               }
            })
        }
    })
})

router.get('/logout',(req,res) =>{
    req.session.destroy();
    res.redirect('/login.html');
})

module.exports = router;