import React, { useEffect } from 'react'
import { Meta, Outlet, useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import  logo from '../assets/chat_app_logo.png'
import io from 'socket.io-client'

const Home = () => {
  const  user  = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const  location = useLocation()
  console.log('user',user)
// console.log("reduxx user",user)
  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })
      dispatch(setUser(response.data.data))
      if(response.data.data.logout){
        dispatch(logout())
        navigate('/email')
      }
      console.log("Current user details", response)
    }
    catch(error) {
      console.log("error", error)
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])

  /**socket connection */
useEffect(()=>{
  const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
    auth:{
      token: localStorage.getItem('token')
    }
  })
  socketConnection.on('onlineUser',(data)=>{
    console.log(data)
    dispatch(setOnlineUser(data))
  })
  dispatch(setSocketConnection(socketConnection))

  return  ()=>{
    socketConnection.disconnect()
  }
},[])
 console.log("location",location)
 const basePath =  location.pathname === '/home'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`  }>
        <Sidebar/>
      </section>
      {/* *message component* */}
      {/* <section className={`${basePath}  && "hidden"`}>
        <Outlet />
      </section> */}
      {/* <div className={`justify-center flex-col items-center  gap-2 hidden ${!basePath ? "hidden":"lg:flex"}` }>
        <div>
          <img 
          src={logo} 
          width={250} 
          alt='logo' />
        </div>
        <p className='text-lg mt-2 text-slate-500'> Select user to send message</p>
      </div> */}

      {/* Right Side: Chat Outlet OR Placeholder */}
  <section >
    {basePath ? (
      <div className={`justify-center flex-col items-center  gap-2 hidden ${!basePath ? "hidden":"lg:flex"}` }>
      <div>
        <img 
        src={logo} 
        width={250} 
        alt='logo' />
      </div>
      <p className='text-lg mt-2 text-slate-500'> Select user to send message</p>
    </div>
    ) : (
      <Outlet />
    )}
  </section>
    </div>
  )
}

export default Home