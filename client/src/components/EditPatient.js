import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";

const EditPatient = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [diagnosis, setDiagnosis] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/patients/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setDiagnosis(res.data.diagnosis)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/patients/${id}`,
        
        
        {
            firstName,
            lastName,
            diagnosis
        })
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            navigate("/home")
        })
        .catch((err)=>{
            console.log(err);
        })

    }


    return(

        <div>
        <h1>Edit Patient</h1>

            <form onSubmit={submitHandler}>
                <div style={{margin: "1em"}} className="row">
                    <div className="col">
                        
                        <input placeholder="First Name" value={firstName} type="text" className="form-control" onChange={(e)=> setFirstName(e.target.value)}></input>
                    </div>

                    <div className="col">
                        
                        <input placeholder="Last Name" value={lastName} type="text" className="form-control" onChange={(e)=> setLastName(e.target.value)}></input>
                    </div>

                    <div className="col">
                        
                        <input placeholder="Diagnosis" value={diagnosis} type="text" className="form-control" onChange={(e)=> setDiagnosis(e.target.value)}></input>
                    </div>

                    
                </div>

                <div style={{
                    margin: "1em"
                }}>
                    <button style={{width:"200px", backgroundColor: "#0C6EFD", color: "white"}} className="btn btn-info"><h5>Edit Patient</h5></button>
                
                </div>
                </form>
        </div>
    )
}


export default EditPatient;