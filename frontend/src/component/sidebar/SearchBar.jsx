
import { IoSearchSharp } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ConversationListAtom, isSelectedConversationAtom, searchAtom } from "../../context/atom/Atom";
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";
function SearchBar() {
   
    const setSearch=useSetRecoilState(searchAtom);
    const search=useRecoilValue(searchAtom);
    const conversationListValue=useRecoilValue(ConversationListAtom);
    const setSelectedConversation=useSetRecoilState(isSelectedConversationAtom);
  
    function displayUser (e) {
         e.preventDefault();
         if(!search)return;
         if(search.length<3){
             return toast.error("Search term  must be atleast 3 charachter long");
            }
        const findUser=conversationListValue.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
        if(findUser){
            setSelectedConversation(findUser);
            setSearch("");
        }else{
            toast.error("NO such user found");
        }
    }



    return (
        <form className="flex items-center gap-2" onSubmit={displayUser}>
            <input type="text" placeholder="Search" className="input input-bordered rounded-full
        "
        value={search}
        onChange={(e) => setSearch( e.target.value )}

            />
            <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>

        </form>
    )
}

export default SearchBar