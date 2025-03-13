import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { CiLogout } from "react-icons/ci"; 
import Avatar from './Avatar'
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
const Sidebar = () => { 

    const user = useSelector(state=> state?.user)  
    const [editUserOpen,setEditUserOpen] = useState(false)

    return (
        <div className='w-full h-full'>

            <div className='bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-500 flex flex-col justify-between'>
                <div>

                    <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${isActive && "bg-slate-300"}`} title='chat'>
                        <IoChatbubbleEllipses
                            size={25}
                        />
                    </NavLink>
                    <div className='w-12 h-12 flex justify-center items-center cursor-pointer
                hover:bg-slate-300 rounded' title='Add Friend'>
                        <FaUserPlus
                            size={25}
                        />


                    </div>
                </div>

                <div className='flex flex-col items-center'> 

                    <button className='w-12 h-12 flex justify-center items-center cursor-pointer
                hover:bg-slate-300 rounded' title = {user?.name} onClick={()=>setEditUserOpen(true)}> 
                        <Avatar 
                        name = {user?.name} 
                        imageUrl={user?.profile_pic}
                        />
                    </button>

                    <button className='w-12 h-12 flex justify-center items-center cursor-pointer
                hover:bg-slate-300 rounded' title='Logout'>
                      <span className='mr-1'>  
                        <CiLogout size={25}/> 
                        </span>
                    </button>
                </div>
            </div> 

            {/*Edit User Details */}

            {
                editUserOpen && (
                    <EditUserDetails onClose={()=>setEditUserOpen(false)} user = {user} ></EditUserDetails>
                )
            }

        </div>
    )
}

export default Sidebar
