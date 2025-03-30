import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import  logo from '../assets/chat_app_logo.png'
const Home = () => {
  const  user  = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const  location = useLocation()
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
 console.log("location",location)
 const basePath =  location.pathname === '/home'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`  }>
        <Sidebar/>
      </section>
      {/**message component**/}
      <section className={`${basePath}  && "hidden"`}>
        <Outlet />
      </section>
      <div className='lg:flex justify-center flex-col items-center  gap-2 hidden'>
        <div>
          <img src={logo} width={250} alt='logo' />
        </div>
        <p className='text-lg mt-2 text-slate-500'> Select user to send message</p>
      </div>
    </div>
  )
}

export default Home