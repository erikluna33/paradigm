const mongoose = require('mongoose');


// const MessageSchema = new mongoose.Schema({
//     content: {
//         type: String,
//         minlength: [1, "Message should contain at least 1 character."]
//     }
// })


const PatientSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "A patient's first name is required"],
        minlength: [1, "A name's length must be at least 1 character"]
    },
    lastName:{
        type: String,
        required: [true, "A patient's last name is required"],
        minlength: [1, "A name's length must be at least 1 character"]
    },
    diagnosis: {
        type: String,
        required: [true, "A patient's diagnosis is required"],
        minlength: [1, "A diagnosis length must be at least 1 character"]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // messages:{
    //     type: [MessageSchema]
    // },
},{timestamps: true})

const PatientModel = mongoose.model("Patient", PatientSchema);
// const MessageModel = mongoose.model("Message", MessageSchema)
module.exports = PatientModel;
// module.exports = MessageModel;




