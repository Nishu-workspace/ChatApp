import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import uploadFile from '../helpers/uploadFile';
import { IoClose } from "react-icons/io5";
import Loading from './Loading';

const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector(state => { return state?.user?.socketConnect })
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: false
  })

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
  const [loading, setLoading] =useState(false)
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })
  const handleUploadImageVideoOpen = () => {
    
    setOpenImageVideoUpload(preve => !preve)
  }
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)
      socketConnection.on('message-user', (data) => {

        setDataUser(data)
      })
    }
  }, [socketConnection, params?.userId, user])

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    // console.log("uploadPhoto",uploadPhoto)
    setLoading(false)
    setOpenImageVideoUpload(false)
    setMessage(preve => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url
      }
    })

  
  }
  const handleClearUploadImage = ()=>{
    setMessage(preve => {
      return {
        ...preve,
        imageUrl: ""
      }
    })
  }
  const handleClearUploadVideo = ()=>{
    setMessage(preve => {
      return {
        ...preve,
        videoUrl: ""
      }
    })
  }
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    // console.log("uploadPhoto",uploadPhoto)
    setLoading(false)
    setOpenImageVideoUpload(false)
    setMessage(preve => {
      return {
        ...preve,
        videoUrl: uploadPhoto.url
      }
    })
  }
  return (
    <div>
      <header className='sticky top-0 h-16  bg-white flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>

          <Link to={"/home"} className='lg:hidden'>
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis
             line-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-2 text-sm'>
              {
                dataUser.online ? <span className='text-purple1'>online</span> : <span className='text-slate-400'>offline</span>
              }
            </p>
          </div>
        </div>
        <div>
          <button className='cursor-pointer hover:text-purple1'>
            <HiOutlineDotsVertical

            />
          </button>
        </div>
      </header>

      {/**show all message */}
      <section className='h-[calc(100vh-128px)]  overflow-x-hidden overflow-y-scroll scrollbar relative'>
        {/**upload image display */}
        {
          message.imageUrl && (
            <div className='w-full h-full bg-slate-700 bg-opacity-30  flex justify-center  items-center rounded overflow-hidden'>
              <div className='w-fit  p-2 absolute top-0 right-0 cursor-pointer hover:text-purple1'onClick={handleClearUploadImage}>
                  <IoClose size={25}/>
              </div>
              <div className='bg-white p-3'>
                <img src={message.imageUrl}
                  
                  alt='uploadImage' 
                  className='aspect-square w-full max-w-sm m-2 object-scale-down'/>
              </div>
            </div>
          )
        }

{/**upload video display */}
{
          message.videoUrl && (
            <div className='w-full h-full bg-slate-700 bg-opacity-30  flex justify-center  items-center rounded overflow-hidden'>
              <div className='w-fit  p-2 absolute top-0 right-0 cursor-pointer hover:text-purple1'onClick={handleClearUploadVideo}>
                  <IoClose size={25}/>
              </div>
              <div className='bg-white p-3'>
                <video
                src={message.videoUrl}
                controls
                muted
                autoPlay
                className='aspect-square w-full max-w-sm m-2 object-scale-down'
                />
              </div>
            </div>
          )
        }
        {
          loading && (
            <div className='w-full  h-full flex justify-center items-center'>
              <Loading/>
            </div>
          )
        }
        show all messages
      </section>

      {/**send message */}
      <section className='h-16 bg-white flex items-center px-4'>

        <div className=' relative '>
          <button className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-purple1 hover:text-white' onClick={handleUploadImageVideoOpen}>
            <FaPlus size={20} />
          </button>

          {/**video and image */}
          {
            openImageVideoUpload &&
            <div className='bg-white shadow rounded absolute  bottom-14 w-36 p-2'>
              <form>
                <label htmlFor='uploadImage' className='flex items-center p-2 gap-3 px-3 hover:bg-slate-200 cursor-pointer'>
                  <div className='hover:text-purple1'>
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label htmlFor='uploadVideo' className='flex items-center p-2 gap-3 px-3 hover:bg-slate-200 cursor-pointer'>
                  <div>
                    <IoVideocam size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <input
                  type="file"
                  id='uploadImage'
                  className='hidden'
                  onChange={handleUploadImage}
                />
                <input
                  type="file"
                  id='uploadVideo'
                  className='hidden'
                  onChange={handleUploadVideo}
                />
              </form>
            </div>
          }

        </div>

      </section>


    </div>
  )
}

export default MessagePage