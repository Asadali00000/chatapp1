import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ConversationListAtom, authAtom } from "../context/atom/Atom";

const useGetConversations = () => {
  
  const [loading, setLoading] = useState(false);
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
  }, []);

  return { loading };
};

export default useGetConversations;
