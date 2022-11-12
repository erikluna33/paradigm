import React, {useState, useEffect} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleChange = (e) => {

        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/users/register`,
        user,
        {
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data)
            setUser({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            setConfirmReg(
                "Thank you for registering!"
            )
            setErrors({});
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.response);
            setErrors(err.response.data.errors)
        })
    }

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
        <div style={{border: "1px solid black", borderRadius:"20px", width:"35vw", height: "55vh", display:"flex", flexDirection:"column", alignItems:"center", margin:"1em", padding:".5em"}}>
            <div>
            {confirmReg ? <h4 style={{color: "green"}}>{confirmReg}</h4> : null}
            <div><h1>Register</h1></div>
            <Form onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Username" value={user.username} onChange={(e)=> handleChange(e)}/>
                    
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" value={user.email} onChange={(e)=> handleChange(e)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={user.password} onChange={(e)=> handleChange(e)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={(e)=> handleChange(e)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

                
            </Form>
            </div>
        </div>
        </div>
        
    )
}

export default Register;
