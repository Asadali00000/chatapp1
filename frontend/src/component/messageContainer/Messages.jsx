import { useRecoilValue } from "recoil"
import { authAtom, isSelectedConversationAtom } from "../../context/atom/Atom"
import { extractTime } from "../../utils/extractTime";

function Messages({messages} ) {
   
  const myId=useRecoilValue(authAtom);
  const  isSelectedConversation=useRecoilValue(isSelectedConversationAtom);
  const isMyMessage=myId._id===messages.senderId;
  const whoseMessage=isMyMessage?"chat-end":"chat-start"
  const profilePic=isMyMessage?myId.profilePic:isSelectedConversation.profilePic;
  const bubbleColor=isMyMessage?"bg-blue-500":"bg-gray-500";
  const extractedTime=extractTime(messages.createdAt);


  return (
    <div className={`chat ${whoseMessage}`}>
    <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
            <img alt='Tailwind CSS chat bubble component' 
             src={profilePic}
            
            />
        </div>
    </div>
    <div className={`chat-bubble text-white ${bubbleColor} shake pb-2`}>{messages.message}</div>
    <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{extractedTime}</div>
</div>

  )
}

export default Messages