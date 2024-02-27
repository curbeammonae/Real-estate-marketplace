import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';


export default function SignIn() {
  const [formData, setFormData] = useState( {} );
 const { loading, error } = useSelector((state) => state.user);
 const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleChange = (e) =>{
    // the unique id: value placed in the form
      setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) =>{
    // e.preventDefault() = prevents the form from refreshing when submitted
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formData)
        
      });
      const data = await res.json()
      console.log(data);
     if( data.success === false){
      dispatch(signInFailure(data,message));
     }
     if(res.ok){
      dispatch(signInSuccess(data));
      navigate('/')
     }
    }catch(error){
      dispatch(signInFailure(error.message))
    } 
  }
  //console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
       <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
        <input type='text' placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
       <button disabled={loading} className='bg-slate-700 rounded-3xl text-white uppercase hover:opacity-80'>{loading ? 'loading...' : 'Sign In'}</button>
       </form>
        <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to ='/signup'><span className='text-blue-700'>Sign Up</span></Link>
        </div>
        <p className='text-red-500 mt-5'>{error && "something went wrong"}</p>
       </div>
  )
}