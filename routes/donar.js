var express = require('express');
const mongoose = require('mongoose');
const Donar = require('../models/donar');
const authenticate = require('../authenticate');

var DonarRoute = express();

DonarRoute.use(express.json());
DonarRoute.use(express.urlencoded({extended: true}));


DonarRoute.route('/')
    .get((req,res,next)=>{
        Donar.find()
            .populate('userid')
            .then((data)=>{
                res.statusCode = 200;
                res.render('donaterList',{donarPosts: data})
            })
            .catch(err=>{
               next(err);
            })
    })
    .post((req,res,next)=>{
        req.body.userid = req.user._id;
        Donar.create(req.body)
            .then((donar)=>{
                res.statusCode = 200;
                res.redirect('/success')
            })
            .catch(err=>{
                next(err);
            })
    })
    .put((req,res)=>{
        res.statusCode = 403;
        res.json("PUT REQUEST NOT AVAILABLE");
    })
    .delete((req,res)=>{
        res.statusCode = 403;
        res.json("DELETE REQUEST NOT AVAILABLE");
    })


DonarRoute.route('/:postId')
    .get((req,res,next)=>{
        Donar.findById(req.params.postId)
            .populate('userid')
            .then((data)=>{
                res.sendStatus = 200;
                res.render('post',{
                    donar: data
                })
            })
            .catch((err)=>{
                next(err);
            })
    })
    .post((req,res)=>{
        res.sendStatus = 403;
        res.json("POST REQUEST NOT AVAILABLE")
    })
    .put((req,res,next)=>{
        const userid = req.user._id.toString();
        Donar.findById(req.params.postId)
            .then((donar)=>{
                if(donar.userid.toString() === userid){
                    res.status(200).json({status: "Put Matched"})
                }
                else{
                    const err = new Error("Ids on PUT not matched "+userid);
                    err.status = 401;
                    next(err);
                }
            })
    })
    .delete((req,res,next)=>{
        const userid = req.user._id.toString();
        Donar.findById(req.params.postId)
            .then((donar)=>{
                if(donar.userid.toString() === userid){
                    res.status(200).json({status: "Delete Matched"})
                }
                else{
                    const err = new Error("Ids on DELETE not matched");
                    err.status = 401;
                    next(err);
                }
            })
            .catch((err)=>{
                next(err);
            })
    })

module.exports = DonarRoute;