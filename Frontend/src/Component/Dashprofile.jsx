import { useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import {Alert, Button, TextInput} from "flowbite-react"
import  { getStorage, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Dashprofile = () => {
  const[imageFile,setImageFile]=useState(null);
  const[imageFileUrl,setImageFileUrl]=useState(null);
  const[imageFileUpLoadProgress,setImageFileUpLoadProgress]=useState(null);
  const[imageFileUpLoadError,setImageFileUpLoadError]=useState(null);
  // console.log(imageFileUpLoadProgress, imageFileUpLoadError)
  const filePicker=useRef();
    const {currentUser}=useSelector(state=>state.user)
    const handleImageChange=(e)=>{
      const file=e.target.files[0];
      if(file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file))
      }
    }
    // console.log(imageFile , imageFileUrl);
    useEffect(()=>{
if(imageFile){
  uploadImage();
}
    },[imageFile])

    const uploadImage=async()=>{
      setImageFileUpLoadError(null)
const storage=getStorage(app);
const fileName=new Date().getTime()+imageFile.name 
const storageRef=ref(storage,fileName)
const uploadTask=uploadBytesResumable(storageRef,imageFile);
uploadTask.on(
  'state_changed',
  (snapshot)=>{
    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    setImageFileUpLoadProgress(progress.toFixed(0));
  },
  (error)=>{
setImageFileUpLoadError('Could not upload image (File must be less than 2 MB)')
setImageFileUpLoadProgress(null);
setImageFile(null);
setImageFileUrl(null);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setImageFileUrl(downloadURL)
    })
  }
)
    }
  return (
    <div className='w-full max-w-lg mx-auto p-3'> 
    <h1 className='my-7 font-semibold text-3xl text-center'> Profile</h1>
    <form  className='flex flex-col gap-4'>
    <input type='file' accept='image/*' onChange={handleImageChange} ref={filePicker} hidden />
    <div className=" relative w-32 h-32 self-center  cursor-pointer shadow-md overflow-hidden rounded-full " onClick={()=>filePicker.current.click()}>
    {imageFileUpLoadProgress && (
            <CircularProgressbar
              value={imageFileUpLoadProgress || 0}
              text={`${imageFileUpLoadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUpLoadProgress / 100
                  })`,
                },
              }}
            />
          )}
        <img src={imageFileUrl||currentUser.profilePicture} alt="user"  className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${
              imageFileUpLoadProgress &&
              imageFileUpLoadProgress < 100 &&
              'opacity-60'
            }`} />
    </div>
    {imageFileUpLoadError && <Alert color='failure'>{imageFileUpLoadError}</Alert>}
    
        <TextInput type='text' placeholder='username' defaultValue={currentUser.userName} id='userName' />
        <TextInput type='email' placeholder='email' defaultValue={currentUser.email} id='email' />
        <TextInput type='text' placeholder='password' defaultValue="********" id='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
    </form>
    <div className="text-pink-700 flex justify-between mt-5">
      <span className='cursor-pointer bg-blue-300 p-3 rounded-full'>Delete Account</span>
      <span className=' text-pink-700 cursor-pointer bg-blue-300 p-3 rounded-full'>Sign Out</span>
    </div>
   </div>
  )
}

export default Dashprofile
