/* eslint-disable no-unused-vars */
import React from 'react'
import chat_app_logo from '../assets/chat_app_logo.png'
const AuthLayouts = ({children}) => {
  return (
    <>
    <header className="flex justify-center items-center py-3 h-20 shadow-md  bg-white">
      <img
        src={chat_app_logo}
        alt="logo"
        width={80}
        height={30}
      />
      <h1 className='font-bold text-2xl'>
        Chat App
      </h1>
    </header>
    {
children
    }
    </>
  )
}

export default AuthLayouts