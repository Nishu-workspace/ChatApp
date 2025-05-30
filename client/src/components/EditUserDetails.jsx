import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/uploadFile'
import Divider from './Divider'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({


    name: user?.user || "",
    profile_pic: user?.profile_pic || "",
    language :  user?.language || "",
  })
  const uploadPhotoRef = useRef()
  const dispatch = useDispatch()
  // console.log('user',user)
  useEffect(() => {
    if (user) {
      setData((preve) => ({
        ...preve,
        name: user.name || "",
        profile_pic: user.profile_pic || "",
        language :  user?.language || "",
      }))
    }
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
  const handleOpenUploadPhoto = (e) => {
    e.preventDefault()
    e.stopPropagation()
    uploadPhotoRef.current.click()
  }
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)
    // console.log("uploadPhoto",uploadPhoto)


    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url,
       
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`
      const response = await axios({
        method: 'post',
        data: data,
        url:URL,
        withCredentials: true
      })
      toast.success(response?.data?.message)

      if(response.data.success){
          dispatch(setUser(response?.data?.data))

          onClose()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'error')
    }

  }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
      <div className='bg-white p-4  py-6  m-1 rounded max-w-sm'>
        <h2 className='font-semibold'>
          Profile Details
        </h2>
        <p className='text-sm'> Edit user Details</p>
        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col  gap-1'>
            <label htmlFor="name">Name:</label>
            <input
              type='text'
              name='name'
              id='name'
              value={data?.name}
              onChange={handleOnChange}
              className='bg-white  w-full py-1 px-2 focus:outline-purple1 border border-purple1'
            />
          </div>
          <div>
          <div className='flex flex-col gap-1'>
    <label htmlFor="language">Language:</label>
    <select
      name='language'
      id='language'
      value={data.language}
      onChange={handleOnChange}
      className='bg-white w-full py-1 px-2 border border-purple1 focus:outline-purple1'
    >
      <option value="">Select Language</option>
      <option value="en">English</option>
      <option value="hi">Hindi</option>
    </select>
  </div>
            <div>Photo: </div>
            <div className='my-1 flex items-center gap-4 '>
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name} />
              <label htmlFor="profile_pic">
                <button className='font-semibold' onClick={handleOpenUploadPhoto}>Change

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
          <Divider />
          <div className='
          flex gap-2 w-fit m-auto'>
            <button onClick={onClose} className='border-purple1 border px-4 py-1 bg-purple2 rounded hover:bg-purple1 hover:text-white '>Cancel</button>
            <button onSubmit={handleSubmit} className='border-purple1 border px-4 py-1 bg-purple2 rounded  hover:bg-purple1 hover:text-white'>Save</button>
          </div>
        </form>
      </div></div>
  )
}

export default React.memo(EditUserDetails)