import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ConversationListAtom, isSelectedConversationAtom, searchAtom } from "../context/atom/Atom";

const useSearchFriend = () => {
  
  const [loading, setLoading] = useState(false);
  const setConversationList = useSetRecoilState(ConversationListAtom);
  const searchValue=useRecoilValue(searchAtom);
  const setSelectedConversation=useSetRecoilState(isSelectedConversationAtom);
  
  useEffect(() => {
      if (!searchValue.trim().length)return;
     setSelectedConversation(null);
      const getConversations = async () => {
          setLoading(true);
          try {
          const res = await fetch(`/api/user/searchFriend/${searchValue}`);
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
  }, [searchValue]);

//   return {loading};

};

export default useSearchFriend;
