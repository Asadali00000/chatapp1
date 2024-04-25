import {  useRecoilValue, useSetRecoilState } from "recoil";
import { allMesssagesAtom, isSelectedConversationAtom, messageInputAtom } from "../context/atom/Atom";
import { useState } from "react";
import toast from "react-hot-toast";

const useSendMessage=()=> {

    
    const message=useRecoilValue(messageInputAtom);
    const isSelectedConversation=useRecoilValue(isSelectedConversationAtom);
    const setAllMessages=useSetRecoilState(allMesssagesAtom)
    const [loading,setLoading]=useState(false);
    const allMessages=useRecoilValue(allMesssagesAtom);

    const sendMessage=async()=>{
        setLoading(true);
        try {
            const messageTempory=message;
            
            const res=await fetch(`/api/message/send/${isSelectedConversation._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  message:messageTempory
                })
                
            })
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setAllMessages([...allMessages,data]);
           
         
          
        
    } catch (error){
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
      
}
return {loading,sendMessage}
     
};

export default useSendMessage