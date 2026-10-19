// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require('morgan')
const cors = require('cors')
const connectToDB = require('./db.js')
const authRoutes = require('./routes/auth.routes.js')
const verifyToken = require('./middleware/verifyToken.js')
const Car = require('./models/Car.js')

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    })
);

app.use(express.json())
app.use(morgan('dev'))



// Routes

app.get('/test',(req,res)=>{
  res.json({message: 'App Works'})
})

app.use('/auth',authRoutes)

app.get('/omar',(req,res)=>{
    res.json({teacher: 'Omar'})
})

app.post('/sayed-hamed',verifyToken, async(req,res)=>{
    console.log(req.user)
    const createdCar = await Car.create({
        make: req.body.make,
        model: req.body.model,
        creator: req.user._id
    })
    res.json(createdCar)
})

app.get('/jameela',(req,res)=>{
    res.json({teacher: 'jameela'})
})





// connect to database and listen on Port 3000
async function startServer() {
    const PORT = process.env.PORT || 3000;
    await connectToDB();

    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
}

startServer();