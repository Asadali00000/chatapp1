
import { useRecoilValue, useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import useSearchFriend from "../../hooks/useSearchFriend";
import {searchAtom } from "../../context/atom/Atom";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
function SearchBar() {
     useSearchFriend();
    const setSearch=useSetRecoilState(searchAtom);
    const search=useRecoilValue(searchAtom);
      
    const displayUser=(e)=>{
        e.preventDefault();
        setSearch(""); 

    }
  


    return (
        <form className="flex items-center gap-2" onSubmit={displayUser}>
            <input type="text" placeholder="Search" className="input input-bordered rounded-full
        "
        value={search}
        onChange={(e) => setSearch( e.target.value )}

            />
            { !search.trim().length?
           <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
            :
           <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                <RxCross1 className='w-6 h-6 outline-none' />
            </button>
           }
        </form>
    )
}

export default SearchBar