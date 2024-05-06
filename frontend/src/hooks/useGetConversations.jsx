import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ConversationListAtom, authAtom, isSelectedConversationAtom, searchAtom } from "../context/atom/Atom";

const useGetConversations = () => {
  
  const [loading, setLoading] = useState(false);
  const searchValue=useRecoilValue(searchAtom);
  const searchValueBool=searchValue.trim().length?1:0;

  const isSelectedConversation=useRecoilValue(isSelectedConversationAtom);
  const setConversationList = useSetRecoilState(ConversationListAtom);
  const authUserValue=useRecoilValue(authAtom);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/${authUserValue._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversationList(data);
       
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [isSelectedConversation,setConversationList,authUserValue._id,searchValueBool]);

  return { loading };
};

export default useGetConversations;
