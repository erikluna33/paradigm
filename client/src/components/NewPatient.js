import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const NewPatient = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const submitHandler = (e) => {

        e.preventDefault();

        axios.post("http://localhost:8000/api/patients",
        {
            firstName,
            lastName,
            diagnosis
        },{withCredentials:true}
        )
        
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            console.log("creating a patient was a success")
            navigate("/home")
        })
        .catch((err)=>{
            console.log(err)
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors)
            setErrors(err.response.data.errors);
        })



    }
    


    return(
        <div>
            <h1>Add a Patient</h1>
            <form onSubmit={submitHandler}>
                <div style={{margin: "1em"}} className="row">
                    <div className="col">
                        
                        <input placeholder="First Name" value={firstName} type="text" className="form-control" onChange={(e)=> setFirstName(e.target.value)}></input>
                        <div>
                            {
                                errors.firstName?
                                <p className="newPtValidators">{errors.firstName.message}</p>
                                :null
                            }
                        </div>
                    </div>

                    <div className="col">
                        
                        <input placeholder="Last Name" value={lastName} type="text" className="form-control" onChange={(e)=> setLastName(e.target.value)}></input>
                        <div>
                            {
                                errors.lastName?
                                <p className="newPtValidators">{errors.lastName.message}</p>
                                :null
                            }
                        </div>
                    </div>

                    <div className="col">
                        
                        <input placeholder="Diagnosis" value={diagnosis} type="text" className="form-control" onChange={(e)=> setDiagnosis(e.target.value)}></input>
                        <div>
                            {
                                errors.diagnosis?
                                <p className="newPtValidators">{errors.diagnosis.message}</p>
                                :null
                            }
                        </div>
                    </div>

                    
                </div>

                <div style={{
                    margin: "1em"
                }}>
                    <button style={{ backgroundColor: "#0C6EFD", color: "white"}} className="btn btn-info"><h5>Add Patient</h5></button>
                    
                
                </div>
                </form>
        </div>
        
    )
}

export default NewPatient;