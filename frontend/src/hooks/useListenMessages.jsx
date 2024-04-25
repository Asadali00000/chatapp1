
import { useEffect } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { allMesssagesAtom } from '../context/atom/Atom';
import { useSocketContext } from '../context/atom/socketState';

const useListenMessages = () => {
  
    const {socket}=useSocketContext();
    const setAllMessages=useSetRecoilState(allMesssagesAtom);
    const allMessages=useRecoilValue(allMesssagesAtom);

    useEffect(() => {

        
        socket?.on("newMessage",(newMessage)=>{
            setAllMessages([...allMessages,newMessage]);
        })
       
        return () => socket?.off("newMessage");
    },[socket,allMessages,setAllMessages])

}

export default useListenMessages