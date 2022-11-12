const PatientModel = require(`../models/patients.model`);
const jwt = require("jsonwebtoken")
const User = require("../models/users.model");
const Message = require("../models/patients.model");

module.exports = {
    findAllPatients: (req, res)=>{
        PatientModel.find({})
        .then((showAllPatients)=>{
            console.log('Inside find all patients')
            res.json(showAllPatients)
        })
        .catch((err)=>{
            console.log('errors');
            res.json(err);
        })
    },
    createPatient: (req, res)=>{

        const newPatientObject = new PatientModel(req.body)
        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })
        newPatientObject.createdBy = decodedJWT.payload.id

        // PatientModel.create(req.body)
        newPatientObject.save()
        .then((newPatient)=>{
            res.json(newPatient);
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    // createMessage:(req, res)=>{
    //     let msg;
    //     Message.create({content: req.body.content})
    //         .then((message) =>{
    //             // console.log("CREATED MESSAGE", message);
    //             msg = message;
    //             PatientModel.findOne({firstName: req.body.firstName})
    //             .then((patient)=> {
    //                 patient.messages.push(msg);
    //                 return res.json(patient);
    //             })
    //             .catch((err)=> res.json(err))
    //         })
    //         .catch((err)=> res.json(err))
        
    // },

    // createMessage:(req, res)=>{
    //     Message.create({content: req.body.content})
    //         .then((message =>{
    //             PatientModel.findOneAndUpdate(
    //                 {firstName: req.body.firstName},
    //                 {$set: {$push:{messages: message} } }
    //                 );
    //         }))
    //             .then((patient)=> res.json(patient));
    // },


    findOnePatient: (req, res)=>{
        PatientModel.findById({_id:req.params.id})
        .then((patientId)=>{
            console.log("Found patient id was a success")
            console.log(patientId);
            return res.json(patientId);
        })
        .catch((err)=>{
            console.log(err);
            return res.json(err);
        })
    },
    deleteOnePatient: (req, res)=>{
        PatientModel.deleteOne({_id:req.params.id})
        .then((deletePatient)=>{
            console.log(this.deletePatient);
            return res.json(deletePatient)
        })
        .catch((err)=>{
            console.log(`There was an error in deleteing a patient. The error is ${err}`);
            return res.json(err)
        })
    },
    updateOnePatient: (req, res)=>{
        PatientModel.findOneAndUpdate({_id:req.params.id},
            req.body,
            {new: true, runValidators: true})
        .then((updatedPatient)=>{
            console.log(updatedPatient)
            res.json(updatedPatient)
        })
        .catch((err)=>{
            console.log(err);
        })
    },

    findAllPatientsByUser:(req, res)=>{
        if(req.jwtpayload.username !== req.params.username){
            console.log("Not the user");
            User.findOne({username:req.params.username})
            .then((userNotLoggedIn)=>{
                PatientModel.find({createdBy: userNotLoggedIn._id})
                .populate("createdBy", "username")
                .then((allPatientsFromUser)=>{
                    console.log(allPatientsFromUser);
                    res.json(allPatientsFromUser)
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
            })
        }
        else{
            console.log('current user');
            console.log("req.jwtpayload.id", req.jwtpayload.id);
            PatientModel.find({createdBy: req.jwtpayload.id})
            .populate("createdBy", "username")
            .then((allPatientsFromLoggedInUser)=>{
                console.log(allPatientsFromLoggedInUser);
                res.json(allPatientsFromLoggedInUser)
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
        }
        
    }
}