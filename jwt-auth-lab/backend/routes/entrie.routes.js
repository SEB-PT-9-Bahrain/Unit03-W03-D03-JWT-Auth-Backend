const router = require("express").Router();
const verifyToken = require('../middleware/verifyToken')
const Entry = require('../models/Entry')

router.post('/',verifyToken, async (req,res)=>{
    try{
        // Logged in user is ALWAYS req.user
        const newEntry = await Entry.create({
            title: req.body.title,
            entryBody: req.body.entryBody,
            isPublic: req.body.isPublic,
            owner: req.user._id
        })
        res.status(201).json(newEntry)
    }catch(err){
        console.log(err)
    }
})


router.get('/', async (req,res)=>{
    try{
        // Logged in user is ALWAYS req.user
        const allEntries = await Entry.find({isPublic: true})
        res.status(200).json(allEntries)
    }catch(err){
        console.log(err)
    }
})



router.get('/', verifyToken, async (req,res)=>{
    try{
        // Logged in user is ALWAYS req.user
        const allEntries = await Entry.find({owner: req.user._id})
        res.status(200).json(allEntries)
    }catch(err){
        console.log(err)
    }
})




module.exports = router;
