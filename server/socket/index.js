const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')
const userModel = require('../models/userModel')
const { profile } = require('console')
const { conversationModel, messageModel } = require('../models/conversationModel')
const getConversation = require('../helpers/getConversation')
const { default: axios } = require('axios')
const app = express()

/**Socket connection */

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})

/**
 * socket running at http://localhost:8080/
 */
//online user
const onlineUser = new Set()

io.on('connection', async (socket) => {
    console.log('connected user', socket.id)

    const token = socket.handshake.auth.token
    //current user details
    const user = await getUserDetailsFromToken(token)

    //create a room
    socket.join(user?._id?.toString())
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUser', Array.from(onlineUser))

    socket.on('message-page', async (userId) => {
        console.log('userId', userId)
        const userDetails = await userModel.findById(userId).select("-password")

        //get previous message
        const getConversationMessage = await conversationModel.findOne({
            "$or": [
                {
                    sender: user?._id,
                    receiver: userId
                },
                {
                    sender: userId,
                    receiver: user?._id
                }
            ]
        }).populate('messages').sort({ updatedAt: -1 })
       console.log("Conversation at server side", getConversationMessage)


        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            language: userDetails?.language,
            online: onlineUser.has(userId),
            
            conversationId: getConversationMessage?._id?.toString()
            
        }
        socket.emit('message-user', payload)

        



        socket.emit('message', {
            conversationId: getConversationMessage?._id?.toString(),
            messages: getConversationMessage?.messages || []
          })
    })



    //new message 
    socket.on('new message', async (data) => {
        const receiverId = data?.receiver
        const senderId = data?.sender
        // checking if convo exist or not
        let conversation = await conversationModel.findOne({
            "$or": [
                {
                    sender: data?.sender,
                    receiver: data?.receiver
                },
                {
                    sender: data?.receiver,
                    receiver: data?.sender
                }
            ]
        })

        //if convo  don't exist then create one
        if (!conversation) {
            const createConversation = await conversationModel({
                sender: data?.sender,
                receiver: data?.receiver
            })
            conversation = await createConversation.save()
        }
        //Getting receiver info
        const recevier = await userModel.findById(receiverId)
        const preferredLang = recevier.language
        
        
        //Checking sender's message language
        const isHindi = /[\u0900-\u097F]/.test(data?.text)
        const senderLang = isHindi ? 'hi': 'en';
        // const translateMessage = async (text, from, to) => {
        //     try {
        //         const res = await fetch("https://translate-api-production-352a.up.railway.app/translate", {
        //             method: "POST",
        //             body: JSON.stringify({
        //               q: text,
        //               source: from,
        //               target: to,
        //               format: "text"
        //             }),
        //             headers: { "Content-Type": "application/json" }
        //           })
        //           console.log("res",res)
        //           const data = await res.json()
        //           console.log("data",data)
        //           console.log("tranlsated text",data.translatedText )
        //           return data.translatedText
        //     } catch (err) {
        //       console.error("Translation error:", err.message)
        //       return text // fallback
        //     }
        //   }
        //   console.log("senderLang", senderLang);
        //   console.log("preferredLang",preferredLang)
        //   console.log("text",data?.text)
        //   let translatedText = ''
        // if(senderLang !== preferredLang){
        //     translatedText = await translateMessage(data?.text, senderLang, preferredLang)
        //     console.log(translatedText)
            
        // }
        // console.log("translated",translatedText)
        const message = new messageModel({

            text: data?.text,
            imageUrl: data?.imageUrl,
            videoUrl: data?.videoUrl,
            msgByUserId: data?.msgByUserId,
            // translatedText: translatedText || ""

        })
        const saveMessage = await message.save()

        console.log('new message', saveMessage)
        console.log("conversation", conversation)
        const updateConversation = await conversationModel.updateOne({ _id: conversation?._id }, {
            "$push": {
                messages: saveMessage?._id
            }
        })

        const getConversationMessage = await conversationModel.findOne({
            "$or": [
                {
                    sender: data?.sender,
                    receiver: data?.receiver
                },
                {
                    sender: data?.receiver,
                    receiver: data?.sender
                }
            ]
        }).populate('messages').sort({ updatedAt: -1 })

        io.to(data?.sender).emit('message',{ 
            conversationId: conversation._id.toString(),
            messages :getConversationMessage?.messages || [],

        })
        io.to(data?.receiver).emit('message', { 
            conversationId: conversation._id.toString(),
            messages :getConversationMessage?.messages || [],

        })
        
        //send conversation
        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)
        io.to(data?.sender).emit('conversation', conversationSender)
        io.to(data?.receiver).emit('conversation', conversationReceiver)
    })
    //sidebar
    socket.on('sidebar', async (currentUserId) => {
        console.log("current user id", currentUserId)
        const conversation = await getConversation(currentUserId)
        socket.emit('conversation', conversation)
       
    })

    socket.on('seen', async(msgByUserId)=>{

        let conversation = await conversationModel.findOne({
            "$or": [
                {
                    sender: user?._id,
                    receiver: msgByUserId
                },
                {
                    sender: msgByUserId,
                    receiver: user?._id
                }
            ]
        })

        const conversationMessageId = conversation?.messages || []
        const updateMessages = await messageModel.updateMany({
            _id : {"$in": conversationMessageId},
            msgByUserId : msgByUserId
        },
    {
        "$set": {seen : true}
    })

    
        //send coonversation
        const conversationSender = await getConversation(user?._id?.toString())
        const conversationReceiver = await getConversation(msgByUserId)
        io.to(user?._id?.toString()).emit('conversation', conversationSender)
        io.to(msgByUserId).emit('conversation', conversationReceiver)
    })
    //disconnect
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id?.toString())
        console.log('disconnected user', socket.id)
    })
})

module.exports = {
    app,
    server
}
