import React from 'react'
import { CiUser } from 'react-icons/ci'
import { useSelector } from 'react-redux'

const Avatar = ({userId,name,imageUrl,width,height}) => {
    const onlineUser = useSelector(state => state?.user?.onlineUser)

    //Nishu Patel =  NP

    let avatarName = ""
    if(name){
        const splitName = name?.split(" ")

        if(splitName.lenght>1){
            avatarName =  splitName[0][0]+[1][0]
        }
        else{
            avatarName =  splitName[0][0]
        }
    }
    console.log(imageUrl)
    const bgColor = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200'
    ]


    const randomNumber = Math.floor(Math.random() *5)
    

    const isOnline = onlineUser.includes(userId)
  return (
    <div className={`text-slate-800  rounded-full  text-xl font-bold  relative`} style={{width:width+"px", height:height+"px"}}>
        {
            imageUrl ? (
                <img
                src={imageUrl}
                width={width}
                height={height}
                alt={name}
                className='rounded-full object-cover w-full h-full '

                />
               
            ) : (
                name ? (
                      <div style={{width:width+"px", height:height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]}`}>
                            {avatarName}
                      </div>  
                ):(
                     <CiUser
                size={width}/>
                )
            )
        }
        {
            isOnline &&  (
            <div className='bg-green-500 p-1 absolute bottom-2 right-0 rounded-full'>

            </div>)
        }
       
    </div>
     
  )
}

export default Avatar