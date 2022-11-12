const PatientController = require("../controllers/patients.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = (app) => {
    app.get("/api/patients", PatientController.findAllPatients);

    app.post("/api/patients", authenticate, PatientController.createPatient);

    // app.post("/message", PatientController.createMessage);

    app.get("/api/patients/:id", PatientController.findOnePatient);

    app.delete("/api/patients/:id", PatientController.deleteOnePatient);

    app.put("/api/patients/:id", PatientController.updateOnePatient);
}