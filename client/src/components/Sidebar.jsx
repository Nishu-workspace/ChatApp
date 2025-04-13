import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import Avatar from './Avatar';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { LuArrowUpLeft } from "react-icons/lu";
import SearchUser from './SearchUser';
import { FaImage } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { logout } from '../redux/userSlice';


const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const socketConnection = useSelector(state => { return state?.user?.socketConnect })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('sidebar', user._id)
            socketConnection.on('conversation', (data) => {
                console.log('conversation', data)

                const conversationUserData = data.map((conversationUser, index) => {
                    console.log('conversationUserData',conversationUser)
                    if(conversationUser?.sender?._id === conversationUser?.receiver?._id){
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        }
                    }
                    else if(conversationUser?.receiver?._id !== user?._id){
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.receiver
                        }
                    }else{
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        }
                    }
                    
                })
                
                setAllUser(conversationUserData)
            })
        }
 
    }, [socketConnection, user])
 console.log('alluser',allUser)
 const handleLogout = ()=>{
 dispatch(logout())
 navigate('/email')
 localStorage.clear()
 }
    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-4 flex flex-col justify-between  '>
                <div>

                    <NavLink className={({ isActive }) => `w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && 'bg-slate-200'}`} title='chat'>
                        <IoChatbubbleEllipses size={25} />
                    </NavLink>

                    <div title="add friend" onClick={() => setOpenSearchUser(true)} className='w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded
            '>
                        <FaUserPlus size={25} />

                    </div>
                </div>

                <div>
                    <button className='w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded
            ' title={user?.name} onClick={() => setEditUserOpen(true)}>

                        <Avatar
                            width={40}
                            height={40}
                            name={user.name}
                            imageUrl={user?.profile_pic}
                            userId={user?._id} />

                    </button>

                    <button title="logout" className='w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded
            ' onClick={handleLogout}>
                        <span className='-ml-2'>
                            <BiLogOut size={25} />
                        </span>

                    </button>
                </div>
            </div>

            <div className='w-full'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4   text-slate-800 '>Message</h2>
                </div>
                <Divider />
                <div className='h-[calc(100vh)-65px] overflow-x-hidden overflow-y-auto scrollbar '>
                    {
                        allUser.length === 0 && (
                            <div className='mt-12'>
                                <div className='flex justify-center items-center my-4 text-slate-500'>
                                    <LuArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <p className='text-lg text-center text-slate-600'>
                                    Explose users to start a conversation with.
                                </p>
                            </div>
                        )
                    }
                    {
                        allUser.map((conv, index) => {
                            console.log("conv",conv)
                            return (
                                <NavLink to={"/home/"+conv.userDetails?._id} key={conv?._id} className='flex items-center gap-2 p-2 border-t  border-b py-3 px-2 hover:border-purple1  hover:border-t-purple1 hover:bg-purple-100 cursor-pointer '>
                                    <div>
                                        <Avatar
                                        imageUrl={conv?.userDetails?.profile_pic}
                                        name={conv.userDetails?.name}
                                        width={35}
                                        height={35}
                                        />
                                    </div>
                                    <div >
                                        <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                                        <div className='text-slate-500 text-xs flex items-center gap-1'>
                                         <div >
                                            {
                                                conv?.lastMg?.imageUrl && (
                                                <div className='flex items-center gap-1'>
                                                    <span ><FaImage/></span>
                                                   {!conv?.lastMg?.text && <span>Image</span> } 
                                                </div>
                                                )
                                            }
                                            {
                                                conv?.lastMg?.videoUrl && (
                                                <div className='flex items-center gap-1'>
                                                    <span ><IoVideocam/></span>
                                                    {!conv?.lastMg?.text && <span>Video</span> } 
                                                </div>
                                                )
                                            }
                                         </div>
                                            <p className='text-xs text-ellipsis line-clamp-1'>{conv?.lastMg?.text}</p>
                                        </div>
                                    
                                    </div>
                                    {
                                        Boolean(conv?.unseenMsg) && (
                                            <p className='flex justify-center items-center w-6 h-6 text-sm ml-auto p-1 bg-purple2 text-purple1 font-semibold rounded-full'>{conv?.unseenMsg}</p>
                                    )
                                    }
                                    
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
            {/***edit user details */}
            {
                editUserOpen && (
                    <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
                )


            }
            {/**Search  user */}
            {
                openSearchUser && (
                    <SearchUser onClose={() => setOpenSearchUser(false)} />
                )
            }
        </div>
    )
}

export default Sidebar