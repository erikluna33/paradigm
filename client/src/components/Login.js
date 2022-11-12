import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8000/api/users/login`,
        
        {
            email: email,
            password: password
        },
        {withCredentials: true,
        },
        )
        .then((res)=>{
            console.log(res, "res");
            console.log(res.data, "is res data!");
            navigate("/home")
        })
        .catch((err)=>{
            console.log(err.response.data);
            // setErrorMessage(err.response.data.message)
        })
    }


    return(
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
        <div style={{border: "1px solid black",borderRadius:"20px", height: "40vh", display:"flex", flexDirection:"column", alignItems:"center", margin:"1em", width:"35vw", padding:"1em"}}>
            <div><h1>Log In</h1></div>
            <Form onSubmit={login}>
                {/* <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                         type="text" 
                         name="email" 
                         placeholder="Enter Email" 
                         value={email} 
                         onChange={(e)=> setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group> */}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} 
                                onChange={(e)=> setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
            </Form>
        </div>
        </div>
    )
}

export default Login;
