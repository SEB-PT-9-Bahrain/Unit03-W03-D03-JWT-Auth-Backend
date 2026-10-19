const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken')
// /sign-up

router.post("/sign-up", async (req, res) => {
  try {
    const { username, password } = req.body;
    // 1. Validation
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please include all required fields" });
    }

    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 6 characters" });
    }

    // 2. encyrpting the password
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);

    const createdUser = await User.create({
      username: req.body.username,
      hashedPassword: encryptedPassword,
    });

    // 3. sending back response
    res.status(201).json({
      username: createdUser.username,
      _id: createdUser._id,
    });
  } catch (err) {
    console.log(err);
  }
});

// /sign-in

router.post("/sign-in", async (req, res) => {
  try {
    // 1. validation
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please include all required fields" });
    }

    const foundUser = await User.findOne({username: req.body.username})

    if(!foundUser){
        return res.status(401).json({
            message: 'No Account with this username'
        })
    }



    // 2. check if password given as same in database

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.hashedPassword )

    if(!isPasswordCorrect){
        return res.status(401).json({
            message: 'Invalid username or password'
        })
    }

    // 3. create the token
    const accessToken = jwt.sign({username: foundUser.username, _id: foundUser._id},process.env.TOKEN_SECRET,{expiresIn:'1h'})

    console.log(accessToken)

    // 4. send the token back as response

    res.status(200).json({
        accessToken: accessToken,
        user:{
            username: foundUser.username,
            _id: foundUser._id
        }
    })
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
