import { useRecoilState } from "recoil"
import Conversation from "./Conversation"
import { ConversationListAtom } from "../../context/atom/Atom"
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";


function ConversationList() {
  const { loading } = useGetConversations();
  const [conversationListValue, setConversationList] = useRecoilState(ConversationListAtom);
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