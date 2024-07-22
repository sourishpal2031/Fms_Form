import { styled, FormControl, FormGroup, InputLabel, Input, Typography, Button } from "@mui/material";
import { useState } from "react";
import { addUser } from "../service/api";
import { useNavigate } from "react-router-dom";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const initialValues = {
  name: '',
  EmpID: '',
  email: '',
  phone: '',
  active: true,
  dateActive: new Date().toISOString(),
  dateInactive: null,
};

const AddUser = () => {
  const [user, setUser] = useState(initialValues);
  const { name, EmpID, email, phone } = user;
  let navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    await addUser(user); // This function in api.js is async
    navigate('/all');
  };

  return (
    <Container>
      <Typography variant="h4">Add User</Typography>
      <FormControl>
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="name" value={name} id="name-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="EmpID-input">EmpID</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="EmpID" value={EmpID} id="EmpID-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="email-input">Email</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="email" value={email} id="email-input" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="phone-input">Phone</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="phone" value={phone} id="phone-input" />
      </FormControl>
      <FormControl>
        <Button onClick={() => addUserDetails()} variant="contained" color="primary">
          Add User
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
