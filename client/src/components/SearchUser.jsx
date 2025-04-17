import React, { useEffect, useState } from 'react'
import { LuUserRoundSearch } from "react-icons/lu";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoCloseSharp } from "react-icons/io5";
const SearchUser = ({onClose}) => {
    const [searchUser, setSearchUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    const handleSearchUser = async()=>{
        const URL = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`
        try{
            setLoading(true)
            const response = await axios.post(URL,{
                search: search
            })
            setLoading(false)
            setSearchUser(response.data.data)
        }catch(error){
            toast.error(error?.response?.data?.message)
        }

    }

useEffect(()=>{
 handleSearchUser()
},[search])
console.log("search user", searchUser

)
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
            <div className='w-full max-w-lg mx-auto mt-10'>
                {/**input search user */}
                <div className='bg-white rounded h-14 overflow-hidden flex '>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder='Search user by name, email...' className='w-full outline-none py-1 h-full px-4' 
                        onChange={(e)=> setSearch(e.target.value)}
                        value={search}
                        />
                    <div className=' h-14 w-14 flex justify-center items-center'>
                        <LuUserRoundSearch
                            size={25}
                        />
                    </div>
                </div>
                {/**display search user */}
                <div className='bg-white mt-4 w-full p-4 rounded-xl max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#C4B5FD] scrollbar-track-gray-100'>
                    {/**No user Found */}
                    {
                        searchUser.length === 0 && !loading && (
                            <p className='text-center text-slate-500 '>
                                no user found</p>
                        )
                    }
                    {/**data is loading */}
                    {
                        loading && (
                            <p> <Loading /> </p>
                        )
                    }
                    {/**Data is available */}
                    {
                        searchUser.length !==0 && !loading && (
                            searchUser.map((user,index)=>{
                                return(
                                   <UserSearchCard key={user._id} user={user} onClose={onClose}/>
                                )
                            })
                        )
                    }
                </div>
            </div>
            <div>
                <button className='absolute top-0 right-0 text-2xl p-2 lg:text-3xl hover:text-purple1 ' onClick={onClose}>
                    <IoCloseSharp
                    />
                </button>
            </div>
        </div>
    )
}

export default SearchUser