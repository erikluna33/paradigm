import React, {useEffect, useState} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";


const AllPatients = (props) => {

    const [patientList, setPatientList] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/patients`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setPatientList(res.data)
            })
            .catch((err)=>{
                console.log(`There was an error in loading all patient files. The error was ${err}`)
            })
    },[])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users",
        {withCredentials:true}
        
        )
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err);

        })
    }, [])

    const deletePatient = (idFromBelow) => {

        axios.delete(`http://localhost:8000/api/patients/${idFromBelow}`)
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            setPatientList(patientList.filter(patient=>patient._id !== idFromBelow))
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const logout = (e) => {
        axios.post(`http://localhost:8000/api/users/logout`,
        {},
        {
            withCredentials: true
        },
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/")
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    

    return(
        <div style={{margin: "1em"}}>

        
            <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                       Welcome {user.username}
                       
                       </Navbar.Brand>
                    <Button style={{color: "white", border: "1px solid white"}} onClick={logout} variant="outline-danger">Log out</Button>{' '}
                </Container>
            </Navbar>
            </>

            

                        <div>
                            <Table striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                        
                                        <th><h4>First Name</h4></th>
                                        <th><h4>Last Name</h4></th>
                                        <th><h4>Diagnosis</h4> </th>
                                        
                                        <th><h4>Actions</h4> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {
                                            patientList.map((patient, i)=>{
                                                return(
                                                    <tr key={i}>
                                                    <th>{patient.firstName}</th>
                                                    <th>{patient.lastName}</th>
                                                    <th>{patient.diagnosis}</th>
                                                    <th style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "center"}}><Link to={`/patient/edit/${patient._id}`}><Button variant="outline-primary">Edit</Button></Link><Link to={`/patient/${patient._id}`}><Button variant="outline-success">View</Button></Link><Button variant="outline-danger" onClick={()=> deletePatient(patient._id)}>Delete</Button></th>
                                                </tr>
                                                )
                                                
                                            })
                                        }
                                       
                                    
                                </tbody>
                            </Table>
                            <div style={{margin: "1em"}}>
                                
                             <Link to={"/new"}><Button variant="primary">Add Patient</Button>{' '}</Link>  
                            </div>
                           
                        </div>
                    
                
            
        
        </div>
    )
}

export default AllPatients;