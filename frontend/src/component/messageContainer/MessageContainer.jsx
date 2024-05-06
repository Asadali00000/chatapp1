import { useRecoilValue, useSetRecoilState } from "recoil";
import Conversation from "../sidebar/Conversation"
import MessageInput from "./MessageInput"
import MessageList from "./MessageList"
import { TiMessages } from "react-icons/ti";
import { authAtom, isSelectedConversationAtom} from "../../context/atom/Atom";
import { getRandomEmoji } from "../../utils/emojis";
import { useEffect } from "react";


function MessageContainer() {
    const isSelectedConversation=useRecoilValue(isSelectedConversationAtom);
    const setSelectedConversation=useSetRecoilState(isSelectedConversationAtom);

    const noChatSelected=!isSelectedConversation;
      
    
    useEffect(()=>{
        
        return  ()=>setSelectedConversation(null);
        
        
    },[setSelectedConversation]);
    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {noChatSelected ? (
                <NoChatSelected />
            ) : (
                <>
                     <Conversation conversation={isSelectedConversation}  lastIdx={1} emoji={getRandomEmoji()}></Conversation>
    
                    <MessageList />
                    <MessageInput />

                </>
            )}

        </div>
    )
}
export const NoChatSelected=()=>{

    const authUserValue=useRecoilValue(authAtom);
    return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋{authUserValue.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
}

export default MessageContainer