import { useRecoilState, useRecoilValue } from "recoil"
import Conversation from "./Conversation"
import { ConversationListAtom, isSelectedConversationAtom, searchAtom } from "../../context/atom/Atom"
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";


function ConversationList() {
  const { loading } = useGetConversations();
 const  setSearch=useRecoilState(searchAtom);
 const isSelectedConversation=useRecoilValue(isSelectedConversationAtom);

  setTimeout(() => {
    if(isSelectedConversation){
        setSearch("")
    }// Code to be executed after the delay
}, 300);
  const conversationListValue = useRecoilValue(ConversationListAtom);
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversationListValue.map((conversation, index) => (
        <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} lastIdx={index===conversationListValue.length-1} />
      ))
      }
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default ConversationList