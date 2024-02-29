import {Table,TableHead,TableBody,TableRow
,TableCell,styled,Button} from '@mui/material';
import { getUsers,deleteUser } from '../service/api';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const StyledTable=styled(Table)`
width:90%;
margin: 50px auto 0 auto;
`

const Thead=styled(TableRow)`

&>th{
    background:#000;
    color:#fff;
    font-size:20px;
}
`

const TBody=styled(TableRow)`
&>td{
    font-size:20px;
}`
//th means tablecell and td=tablebody

const AllUsers=()=>{
    const[users,setUsers]=useState([]);
    useEffect(()=>{
     getUserDetails();
    },[])

    
    const deleteUserData=async(id)=>{
        await deleteUser(id);
        getUserDetails();
    }
    const getUserDetails=async()=>{
        let response=await getUsers();
        //console.log(response);
        setUsers(response?.data);
    }

    return(
      <StyledTable>
        <TableHead>
            <Thead>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell></TableCell>
            </Thead>
        </TableHead>
        <TableBody>
         {
            users?.map((user)=>(
                <TBody key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                        <Button variant='contained' color='primary' style={{marginRight:10}} component={Link} to={`/edit/${user.id}`}>Edit</Button>
                        <Button variant='contained' color="secondary" onClick={()=>deleteUserData(user.id)}>Delete</Button>
                    </TableCell>
                </TBody>
            ))
         }
        </TableBody>
      </StyledTable>
    )
}

export default AllUsers;