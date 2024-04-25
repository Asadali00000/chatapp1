import { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, loginAtom } from "../context/atom/Atom";
function useLogin() {
    const [loading, setLoading] = useState(false);
    const authSet=useSetRecoilState(authAtom);

   const userDetails=useRecoilValue(loginAtom);
    const loginUser = async () => {

        const isValid = validateInputs(userDetails);
        if (!isValid) {
            return;
        }
        setLoading(true);
        try {
            const username=userDetails.username;
            const password=userDetails.password;
            const res = await fetch("/api/auth/login", {
                method: "POST",
                
                headers: {
                    "Content-Type": "application/json",
                },
                
                
                body: JSON.stringify({username,password}),
                
            });
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            authSet(JSON.parse(localStorage.getItem("chat-user")));
            
        } catch (error) {
            toast.error(error.message);

        }finally{
            setLoading(false);
        }
    };

 return {loading,loginUser};
}


function validateInputs({username,password}) {
    if ( !username || !password ) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}



export default useLogin;