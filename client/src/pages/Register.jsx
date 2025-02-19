import React, { useState } from 'react'

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3>Welcome to chat app</h3>
        <form className='grid gap-3 mt-5'>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input type="text"
              id='name'
              name='name'
              placeholder='Enter  your name'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
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
              placeholder='Enter  your email'
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
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
              className='bg-slate-100 px-2 py-2 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          {/* profile pic */}
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">Profile_pic
              <div className="h-14 bg-slate-200 flex justify-center items-center border-2 rounded-sm hover:border-primary ">
                <p className='text-sm'>Upload Profile Photo</p> 

              </div>
            </label>
            <input type="file"
              id='profile_pic'
              name='profile_pic'
              
              className='bg-slate-100 px-2 py-2 focus:outline-primary hidden'
              
             
            
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register