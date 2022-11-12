import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';




const OnePatient = (props) => {

    const [patient, setPatient] = useState({});
    const [note, setNote] = useState("");
    const navigate = useNavigate();
   

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/patients/${id}`)
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                setPatient(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [id])





    return(
        <div>
           

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: "1em"
        }}>
            

                    <Box width='300px'>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>Patient Information</Typography>
                                <Typography variant='body2' color='text.secondary'>{patient.lastName}, {patient.firstName}</Typography>
                                <Typography variant='body2' color='text.secondary'>{patient.diagnosis}</Typography>

                            </CardContent>
                        </Card>
                    </Box>

                    

                    
                    

           


            </div>
        </div>

        
    )
}

export default OnePatient;