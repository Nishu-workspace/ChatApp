import React, { useEffect, useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios'
import toast from 'react-hot-toast';
import { CiUser } from "react-icons/ci";

import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

const  CheckPasswordPage = () => {
  const [data, setData] = useState({

    password: ""
  })
 
  const navigate = useNavigate()
  const location = useLocation()
  const  dispatch = useDispatch()
  console.log("location", location?.state)
  
  useEffect(()=>{
    if(!location?.state?.name){
      navigate('/email')
    }
  },[])
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  
 


  const handleForgotPassword = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/send-otp`
    try {
      console.log("email", location?.state?.email)
      const response = await axios.post(URL, {email: location?.state?.email})
      console.log('response', response)
      toast.success(response.data.message)
      navigate('/reset-password', { state: { email: location?.state?.email } })
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log("error", error)
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    e.stopPropagation()
    //Added userId before sending req in  backend.
    
    console.log("Sending data to backend:", data);
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`
    // console.log(data)
    
    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data:{
          userId:location?.state?._id,
          password:data.password
        },
        withCredentials:true
      })
      // console.log("response", response)
      toast.success(response?.data?.message)
      if (response?.data?.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token',response?.data?.token)
        setData({
          password: "",
        })
        navigate('/home',{replace:true})
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      // console.log("error", error)
    }
  }
  return (
    <div className="mt-5">
    <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
      <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
        {/* <CiUser
        
        size={70}/> */}
        <Avatar
        width={70}
        height={70}
        name={location?.state?.name}
       imageUrl={location?.state?.profile_pic}
        />
        <h2>{location?.state?.name}</h2>
      </div>
      <h3>Welcome to chat app</h3>
      <form className='grid gap-3 mt-5' onSubmit={handleSubmit}>
        
        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input type="password"
            id='password'
            name='password'
            placeholder='Enter  your password'
            className='bg-slate-100 px-2 py-2 focus:outline focus:outline-2 focus:outline-purple2'
            value={data?.password}
            onChange={handleOnChange}
            required
          />
        </div>
        {/* password*/}
        
       
        <button
          className='bg-purple2 text-lg  px-4 py1 hover:bg-purple1 rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
        >
          Login
        </button>
      </form>
      <p className='my-3 text-center'>New User? <Link onClick={handleForgotPassword}className="hover:text-purple1 font-semibold">Forgot Password?</Link></p>
    </div>
  </div>
  )
}
export default CheckPasswordPage