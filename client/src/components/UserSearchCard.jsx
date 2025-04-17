import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({user, onClose}) => {
  return (

    // Link to={"/home/"+user?._id} 
    <Link to={"/home/"+user?._id} onClick={onClose} className='flex items-center gap-4 p-3 rounded-lg cursor-pointer 
                 hover:bg-[#F3F0FF] transition-all duration-150 border border-transparent 
                 hover:border-[#C4B5FD]'>
        <div>
            <Avatar
           width={50} 
           height={50}
           name={user?.name}
           imageUrl={user?.profile_pic}
           userId={user?._id}
        />
        </div>
        <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
            <p className='font-semibold text-sm text-gray-800 truncate'>{user?.name}</p>
        </div>
        <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
        </div>
    </Link>
  )
}

export default UserSearchCard