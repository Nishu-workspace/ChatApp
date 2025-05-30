const { conversationModel } = require("../models/conversationModel")

const getConversation = async(currentUserId)=>{
    if(currentUserId){
        const currentUserConversation = await conversationModel.find({
            "$or": [
                { sender: currentUserId },
                { receiver: currentUserId }
            ]
        }).sort({ updatedAt: -1 }).populate('messages').populate('sender').populate('receiver')
        // console.log('currentUserConversation', currentUserConversation)
        const conversation = currentUserConversation.map((conv) => {
            const countUnseenMsg = conv.messages.reduce((preve, curr) => {

                const msgByUserId = curr?.msgByUserId?.toString() 


                if(msgByUserId !== currentUserId){
                    return preve + (curr?.seen? 0 : 1)
                }
                else{
                    return preve
                }
            },0)
            return {
                _id: conv?._id,
                sender: conv?.sender,
                receiver: conv?.receiver,
                unseenMsg: countUnseenMsg,
                lastMg: conv.messages[conv?.messages?.length - 1],

            }
        })
        return conversation
        // socket.emit('conversation', conversation)
    }
    else{
        return []
    }
}
module.exports = getConversation