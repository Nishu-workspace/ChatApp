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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="otp">Enter the otp</label>
        <input 
        type="text" 
        id='otp' 
        name='otp'
        value={data.otp}
        onChange={handleOnChange}
        />
      </div>
      <div>
        <label htmlFor="reset-password">Enter the new password</label>
        <input type="password" id='reset-password' name='password' value={data.password} 
         onChange={handleOnChange}/>
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="password" id='confrim password.' />
      </div>
      <button>
        Submit
      </button>
    </form>

  )
}

export default ForgotPassword