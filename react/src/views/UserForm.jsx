import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'

export default function UserForm() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [loading ,setLoading]=useState(false)
    const [errors, setErrors] = useState(null)
    const [user, setUser]=useState({
        id:null,
        name:'',
        email:'',
        password:'',
        password_confirmation:''
    })

    if(id){
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/users/${id}`)
            .then(({data})=>{
                setLoading(false)
                setUser(data)
            })
            .catch(()=>{
                setLoading(false)
            })
        },[])
    }

    // onsubmit function
   const onSubmit = (ev) => {
    ev.preventDefault();

    if (user.id) {
        // Update existing user
        axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                navigate('/users');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    // Handle other errors (e.g., network errors)
                    console.error('Error message:', err.message);
                }
            });
    } else {
        // Create new user
        axiosClient.post(`/users`, user)
            .then(() => {
                navigate('/users');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    // Handle other errors (e.g., network errors)
                    console.error('Error message:', err.message);
                }
            });
    }
};


  return (
    <>
    {user.id && <h1>Update User: {user.name}</h1> }
      {!user.id && <h1>New User</h1> }
      <div className='card animated fadeInDown'>
        {loading && (
            <div className='text-center'>Loading...</div>
        )}

        {errors && <div className='alert'>
            {Object.keys(errors).map(key=> (
                <p key={key}>{errors[key][0]}</p>
             ))}
         </div>
        }

        {/* form creating */}
        {!loading &&
            <form onSubmit={onsubmit}>
                <input value={user.name} onChange={ev => setUser({...user,name:ev.target.value})} placeholder='Name' />
                <input value={user.email}  onChange={ev => setUser({...user,email:ev.target.value})} placeholder='email' />
                <input onChange={ev => setUser({...user, password:ev.target.value})} placeholder='password' />
                <input onChange={ev => setUser({...user,password_confirmation: ev.target.value})} placeholder='passowrd_confirmation' />
                <button className="btn" >Save</button>
            </form>
        }
      </div>
    </>
  )
}
