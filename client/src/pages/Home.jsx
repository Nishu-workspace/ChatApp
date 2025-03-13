import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo.png'
const Home = () => {
  const  user  = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })
      dispatch(setUser(response.data.data))
      if(response.data.data.logut){
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
 console.log("Location",location)
 const basepath = location.pathname ==='/'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basepath && "hidden"} lg:block`}>
           <Sidebar/>
      </section>
    {/*Message Componenets*/}  
      <section className={`${basepath && 'hidden'}`}>
      <Outlet/>
      </section>

      <div className='lg:flex justify-center items-center flex-col gap-2 hidden'>
        <div>
          <img
          src={logo}
          width={250}
          alt='logo'
          />
        </div>
<p className='text-lg mt-2 text-slate-500'> Select user to send message</p>
      </div>


    </div> 


  )
}

export default Home