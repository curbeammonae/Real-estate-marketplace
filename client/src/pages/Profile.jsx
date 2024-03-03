import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { getStorage, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import { app }  from '../firebase'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  console.log(file)

  // firebase storage
  // allow read;
  // allow write: if 
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if(file){
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
      snapshot.totalBytes) * 100;
      console.log('upload is' + progress + '% done')
    },
    )
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        {/* allows us to upload only images */}
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        
        <img onClick={()=> fileRef.current.click()}src={currentUser.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type='text' id='username'placeholder='username'className=' p-3 rounded-lg'/>
        <input type='email' id='email'placeholder='email'className=' p-3 rounded-lg'/>
        <input type='password' id='password'placeholder='password'className=' p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      
    </div>
  )
}
