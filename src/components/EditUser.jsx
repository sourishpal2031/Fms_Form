import { styled,FormControl,FormGroup, InputLabel ,Input,Typography,Button} from "@mui/material";
import { useState,useEffect } from "react";

import {getUsers,editUser} from "../service/api";

import { useNavigate,useParams } from "react-router-dom";



const Container=styled(FormGroup)`
width:50%;
margin: 5% auto 0 auto;
&>div{
    margin-top: 20px;
}
`
const initialValues={
    name:'',
    EmpID:'',
    email:'',
    phone:''
}


const EditUser=()=>{
    const[user,setUser]=useState(initialValues);
    let navigate=useNavigate();
    const {id}=useParams();
    const{name,EmpID,email,phone}=user;

    useEffect(()=>{
        loadUserData();
    },[])

    const loadUserData=async()=>{
        const response=await getUsers(id);
        setUser(response.data);
    }

    const editUserDetails=async()=>{
       await editUser(id,user); //cause adduser in api.js ia an async function
        navigate('/all');
    }
    const onValueChange=(e)=>{
        console.log(e.target.value);
       setUser({...user,[e.target.name]:e.target.value})
    }
    
   
    return(
        <Container>
        <Typography variant="h4">
        Edit Information
        </Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">
                    Name
                </InputLabel>
                <Input onChange={(e)=>onValueChange(e)} name="name" value={name} id="my-input" aria-describedby="my-helper-text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">
                    EmpID
                </InputLabel>
                <Input  onChange={(e)=>onValueChange(e)} name="EmpID" value={EmpID} id="my-input" aria-describedby="my-helper-text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">
                    Email
                </InputLabel>
                <Input  onChange={(e)=>onValueChange(e)} name="email" value={email} id="my-input" aria-describedby="my-helper-text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">
                    Phone
                </InputLabel>
                <Input  onChange={(e)=>onValueChange(e)} name="phone" value={phone} id="my-input" aria-describedby="my-helper-text"/>
            </FormControl>
            <FormControl>
                <Button onClick={()=>editUserDetails()} variant="contained">
                Edit User
                </Button>
            </FormControl>
        </Container>
    )
}

export default EditUser;