import axios from 'axios';

const API_URL='http://localhost:3002/users'

export const addUser=async(user)=>{
    try{
       return await axios.post(`${API_URL}`,user);
    }catch(error){
        console.log('Error while calling addUser api ',error.messeage);
    }
}

export const getUsers=async(id)=>{
    id=id||'';
    try{
        return await axios.get(`${API_URL}/${id}`);
    }catch(error){
        console.log(`Error while calling getUsers api`,error.messeage);
    }
}

// export const getUser=async(data)=>{
//     try{
//         return await axios.get(`${API_URL}/${data}`);
//     }catch(error){
//         console.log(`Error while calling getUser api`,error.messeage);
//     }
// }

export const editUser=async(id,user)=>{
    try{
return await axios.put(`${API_URL}/${id}`,user);
    }catch(error){
console.log(`Error while calling editUser api`,error.messeage);
    }
}

export const deleteUser=async(id)=>{
    try{
        return await axios.delete(`${API_URL}/${id}`);
    }catch(error){
        console.log(`Error while calling deleteuser api`,error.messeage);
    }
}

export const updateUser = async (id, updatedUser) => {
    return await axios.put(`${API_URL}/${id}`, updatedUser);
  };
