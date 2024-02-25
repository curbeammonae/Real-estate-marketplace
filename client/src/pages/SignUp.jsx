import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'


export default function SignUp() {
  const [formData, setFormData] = useState( {} );
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) =>{
    // the unique id: value placed in the form
      setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) =>{
    // e.preventDefault() = prevents the form from refreshing when submitted
    e.preventDefault();
    try{
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formData)
        
      });
      const data = await res.json()
      console.log(data);
      setLoading(false);
      navigate('/signin')
      if(data.success == false){
        setError(false)
      }
      //setError(false);

    }catch(error){
      setLoading(false);
      setError(true)
    }
   
   
  }
  //console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
       <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
        <input type='text' placeholder='username' id='username' className='bg-slate-100 p-3 rounded-lg'onChange={handleChange} />
        <input type='text' placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
       <button disabled={loading} className='bg-slate-700 rounded-3xl text-white uppercase hover:opacity-80'>{loading ? 'loading...' : 'Sign Up'}</button>
       </form>
        <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to ='/signin'><span className='text-blue-700'>Sign In</span></Link>
        </div>
        <p className='text-red-500 mt-5'>{error && "something went wrong"}</p>
       </div>
  )
}