import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ConversationListAtom, allMesssagesAtom, isSelectedConversationAtom } from "../context/atom/Atom";

const useGetMessages = () => {

    const [loading, setLoading] = useState(false);
    const isSelectedConversation = useRecoilValue(isSelectedConversationAtom);
    const setAllMessages = useSetRecoilState(allMesssagesAtom);
   
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/message/${isSelectedConversation._id}`)
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                setAllMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (isSelectedConversation?._id) {
            getMessages();
        }else{
            setLoading(false);
        }
    }, [isSelectedConversation?._id, setAllMessages]);

    return { loading };
};

export default useGetMessages;
