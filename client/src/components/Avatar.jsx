import React from 'react'
import { CiUser } from 'react-icons/ci'

const Avatar = ({userId,name,imageUrl,width,height}) => {

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
    console.log(randomNumber)
  return (
    <div className={`text-slate-800 overflow-hidden rounded-full shadow border text-xl font-bold `}>
        {
            imageUrl ? (
                <img
                src={imageUrl}
                width={width}
                height={height}
                alt={name}
                />
               
            ) : (
                name ? (
                      <div style={{width:width+"px", height:height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]}`}>
                            {avatarName}
                      </div>  
                ):(
                     <CiUser
                size={34}/>
                )
            )
        }
    </div>
     
  )
}

export default Avatar