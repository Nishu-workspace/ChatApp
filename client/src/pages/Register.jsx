import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile'
import axios from 'axios'
import toast from 'react-hot-toast';
const Register = () => {
  const [cpass,setCpass] = useState()
  const handelConfrimPass = (e)=>{
    setCpass(e.target.value)
    if(e.target.value != data.password){
      toast.error("Password doesn't match")
    }
  }
  const handleBlur = (e) => {
    // If the input is invalid when the user leaves the field, show a toast
    if (!e.target.validity.valid) {
      toast.error("Please enter a valid email address");
    }
  };
  const location = useLocation()
  const initialEmail = location.state?.email || '';
  const [data, setData] = useState({
    name: "",
    email: initialEmail,
    password: "",
    profile_pic: ""
  })
 
  const [uploadPhoto, setUploadPhoto] = useState("")
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handelUploadPhoto = async (e) => {
    const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)
    // console.log("uploadPhoto",uploadPhoto)
    setUploadPhoto(file)

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url
      }
    })
  }
  const handleClearUploaadPhoto = (e) => {
    // e.stopPropogation()
    e.preventDefault()
    setUploadPhoto(null)
  }
  const handleSubmit = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (data.password.length < 8 || data.password.length > 10 ) {
      toast.error("Password must be at least 8 and Atmost 10 Character Long");
      return;
    }
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!regex.test(data.password)) {
      toast.error("Password must contain at least one number and one special character");
      return;
    }
    
    if(cpass != data.password){

      toast.error("Password doesn't match")
      return;
    }
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`
    console.log(data)

    try {
      const response = await axios.post(URL, data)
      console.log("response", response)
      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        })
        navigate('/verify-otp', {state: {email: data.email}})
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log("error", error)
    }
  }

  console.log(uploadPhoto)
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <h3 className='text-center font-bold text-lg' >Welcome to chat app</h3>
        <form className='grid gap-3 mt-5' onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input type="text"
              id='name'
              name='name'
              placeholder='Enter  your name'
              className='bg-slate-100 px-2 py-2 focus:outline focus:outline-2 focus:outline-purple2'
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input type="email"
              id='email'
              name='email'
              onBlur={handleBlur}
             
              placeholder='Enter  your email'
              defaultValue={data.email}
              className='bg-slate-100 px-2 py-2 focus:outline focus:outline-2 focus:outline-purple2'
              value={data.email}
             
              onChange={handleOnChange}
              required
            />
          </div>
          {/* password*/}
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input type="password"
              id='password'
              name='password'
              placeholder='Enter  your password'
              className='bg-slate-100 px-2 py-2 focus:outline focus:outline-2 focus:outline-purple2'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password"
              id='confirm-password'
              name='confirm-password'
              placeholder='Confirm Password'
              className='bg-slate-100 px-2 py-2 focus:outline focus:outline-2 focus:outline-purple2'
              onBlur={handelConfrimPass}
              required
            />
          </div>
          {/* profile pic */}
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">Profile_pic
              <div className="h-14 bg-slate-200 flex justify-center items-center border-2 rounded-sm hover:border-purple1 ">
                <p className='text-sm max-w-[300] text-ellipsis line-clamp-1'>
                  {uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"}
                </p>
                {
                  uploadPhoto?.name && (
                    <button className='text-xl  ml-2  hover:text-red-400' onClick={handleClearUploaadPhoto}>  <IoIosClose /> 
                    </button>

                  )
                }
              </div>
            </label>
            <input type="file"
              id='profile_pic'
              name='profile_pic'

              className='bg-slate-100 px-2 py-2 focus:outline-primary hidden'
              onChange={handelUploadPhoto}


            />
          </div>
          <button
            className='bg-purple2 text-lg  px-4 py1 hover:bg-purple1 rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Register
          </button>
        </form>
        <p className='my-3 text-center'>Alredy have account? <Link to={"/email"} className="hover:text-purple1 font-semibold">Login</Link></p>
      </div>
    </div>
  )
}

export default Register