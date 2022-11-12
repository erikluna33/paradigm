const mongoose = require("mongoose");
// const databaseName = 'patients';

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log("Connected to the database");
    })
    .catch((err)=>{
        console.log(`There was a problem connecting to the databse. The problem is ${err}`)
    })