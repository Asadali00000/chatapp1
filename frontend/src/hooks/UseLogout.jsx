import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../context/atom/Atom";
import { useState } from "react";
function UseLogout() {
    const [loading, setLoading] = useState(false);
    const authSet=useSetRecoilState(authAtom);


    const LogoutUser = async () => {

        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            
                headers: {
                    "Content-Type": "application/json",
                },


            });
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user");
            authSet(null);
            
        } catch (error) {
            toast.error(error.message);

        }finally{
            setLoading(false);
        }
    };

 return {loading,LogoutUser};
}
export default UseLogout;
