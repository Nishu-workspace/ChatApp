import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {setUser} from'../redux/userSlice' 

const EditUserDetails = ({ onClose, user }) => {
    const [data, setData] = useState({
        name: user?.user,
        profile_pic: user?.profile_pic
    }) 
    const uploadPhotoRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        setData((preve) => {
            return {
                ...preve,
                ...user
            }
        })

    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {

            return {
                ...preve,
                [name]: value
            }
        })
    } 
    const handleOpenUploadPhoto = (e)=>{
        e.stopPropagation()
        e.preventDefault()
         uploadPhotoRef.current.click();
    }
    const handleUploadPhoto = async(e)=> { 

        const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)
    // console.log("uploadPhoto",uploadPhoto)
   

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url
      }
    })

    }   

    const handleSubmit = async(e) =>{
        e.preventDefault();   // Prevents form submission
        e.stopPropagation();  // Stops event bubbling 
        try{
            const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`
            const response = await axios(
                {
                    method:'post',
                    url:URL,
                    data:data,
                    withCredentials:true
                }) 
            if(response.data.success){
                    dispatch(setUser(response.data.data)) 
                    onClose()   
            }
            toast.success(response?.data?.message)
        }
        catch(error){
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
            <div className='bg-white p-4 m-1 py-6 rounded w-full max-w-sm'>
                <h2 className='font-semibold'>Profile</h2>
                <p className='text-sm'>Edit user details</p>

                <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='w-full py-1 px-2 bg-slate-400 rounded-xl focus:outline-primary border-0.5 '
                        />

                    </div>
                    <div>
                       <div>Photo:</div>
                        <div className="flex items-center gap-2 py-2">
                            <Avatar 
    
                                size={40}
                                imageUrl={data?.profile_pic}
                                name={data?.name}
                            />
                             <label htmlFor="profile_pic">
                            <button onClick={handleOpenUploadPhoto}
                             className="font-semibold text-sm text-blue-600 hover:underline px-5">
                                Change Photo
                            </button> 
                            <input
                            type='file' 
                            id='profile_pic'
                            className='hidden'
                            onChange={handleUploadPhoto} 
                            ref={uploadPhotoRef}
                            />
                        </label>
                        </div> 
                    </div>  
                    <Divider/>
                    <div className='flex gap-2 w-fit ml-auto '>
                        <button onClick={onClose} className='border-primary border px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                        <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(EditUserDetails)
