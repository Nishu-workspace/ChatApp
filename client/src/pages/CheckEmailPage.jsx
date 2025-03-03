import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile'
import axios from 'axios'
import toast from 'react-hot-toast';
import { CiUser } from "react-icons/ci";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  })

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

  const handleSubmit = async (e) => {
    e.stopPropagation()
    e.preventDefault()

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/email`
    console.log(data)

    try {
      const response = await axios.post(URL, data)
      // console.log("response", response)
      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          email: "",
        })
        navigate('/password', {
          state: response?.data?.data
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      // console.log("error", error)
    }
  }
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2">
          <CiUser

            size={70} />
        </div>
        <h3>Welcome to chat app</h3>
        <form className='grid gap-3 mt-5' onSubmit={handleSubmit}>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input type="email"
              id='email'
              name='email'
              placeholder='Enter  your email'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          {/* password*/}


          <button
            className='bg-primary text-lg  px-4 py1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Let's Go
          </button>
        </form>
        <p className='my-3 text-center'>New User? <Link to={"/register"} className="hover:text-primary font-semibold">Register</Link></p>
      </div>
    </div>
  )
}

export default CheckEmailPage