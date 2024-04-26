import { useRecoilValue } from "recoil"
import Messages from "./Messages"
import { allMesssagesAtom, isSelectedConversationAtom } from "../../context/atom/Atom"
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

function MessageList() {
  useListenMessages();
  const allMessages = useRecoilValue(allMesssagesAtom);
  const { loading } = useGetMessages(); 
  const scrollRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [allMessages]);
  

  return (
    <div className="px-4 flex-1 overflow-auto">
      {allMessages.map((conversationn) => (
    <div key={conversationn._id} ref={scrollRef}>

        <Messages messages={conversationn} />
    </div>
      ))
      }
      {/* <Messages conversation={} */}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && allMessages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default MessageList
