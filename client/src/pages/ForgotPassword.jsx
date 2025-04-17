import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  
  const navigate = useNavigate()
  const location = useLocation()
  
  const [data,setData] = useState({
    email:location?.state?.email || "",
    password: "",
    confirmPassword: "",
    otp:""
  })
  console.log("location", location?.state)

  const handleOnChange = (e)=>{
 const {name, value} = e.target
 setData((preve)=>{
  return {
    ...preve,
    [name]:value
  }
 })
  } 
  const handleSubmit = async(e)=>{
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
    if(data.password != data.confirmPassword){
      toast.error("Password does not match")
      return;
    }



    

 const URL = `${import.meta.env.VITE_BACKEND_URL}/api/reset-password`

 try{
  const response = await axios.post(URL,data)
  console.log("response",response)
  toast.success(response.data.message)

  if(response.data.success){
    navigate('/email')
  }
 }
 catch(error){
  toast.error(error?.response?.data?.message)
  console.log("error",error)
 }

  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-2 '>
      <div className='flex flex-col items-start gap-1 mb-4 w-[300px]'>
        <label htmlFor="otp">Enter the otp</label>
        <input 
        type="text" 
        id='otp' 
        name='otp'
        value={data.otp}
        onChange={handleOnChange}
        />
      </div>
      <div className='flex flex-col items-start gap-1 mb-4 w-[300px]'>
        <label htmlFor="reset-password">Enter the new password</label>
        <input type="password" id='reset-password' name='password' value={data.password} 
         onChange={handleOnChange}/>
      </div>
      <div className='flex flex-col items-start gap-1 mb-4 w-[300px]'>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password" name='confirmPassword' id='confrimPassword.' value={data.confirmPassword} onChange={handleOnChange}/>
      </div>
      <button className='border rounded border-purple1 px-4 bg-purpel2 hover:bg-purple1 hover:text-white  '>
        Submit
      </button>
    </form>

  )
}

export default ForgotPassword