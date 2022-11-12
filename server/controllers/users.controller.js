const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { findOne } = require('../models/notes.model');


module.exports = {
    register:(req, res)=>{
        const user = new User(req.body)
            user.save()
                .then((newUser)=>{
                    console.log(newUser);
                    console.log("Successful register")
                    res.json({
                        successMessage: "Thanks for registering",
                        User: newUser
                    })
                })
                .catch((err)=>{
                    console.log("Not a successful register")
                    res.status(400).json(err)
                })
    },
    login: (req, res)=>{
        User.findOne({email: req.body.email})
            .then((userRecord)=>{
                if(userRecord === null){
                    res.status(400).json({message: "Invalid login"})
                }
                else{
                    bcrypt.compare(req.body.password, userRecord.password)
                    .then((isPasswordValid)=>{
                        if(isPasswordValid){
                            console.log("Password is valid");
                            res.cookie(
                                "usertoken",
                                jwt.sign({
                                    id: userRecord._id,
                                    email: userRecord.email,
                                    username: userRecord.username
                                },
                                process.env.JWT_SECRET
                                ),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 900000)
                                }
                            ).json({
                                message: "Successfully logged in!",
                                userLoggedIn: userRecord.username,
                                userId: userRecord._id
                            });
                        }
                        else{
                            res.status(400).json({message: "Invalid attempt"})
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(400).json({message: "Invalid attempt!"})
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({message: "Invalid Attempt"})
            })
    },
    logout: (req, res)=>{
        console.log("Logging out");
        res.clearCookie('usertoken');
        res.json({
            message: "You've logged out!"
        });
    },
    getLoggedInUser:(req, res)=>{
        // const decodedJWT = jwt.decode(req.cookies.userToken,{
        //     complete:true
        // });
        User.findOne({_id:req.jwtpayload.id})
            .then((user)=>{
                console.log(user)
                res.json(user)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}