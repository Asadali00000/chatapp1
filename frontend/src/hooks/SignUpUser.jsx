import { useState } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../context/atom/Atom";
function SignUpUser() {
    const [loading, setLoading] = useState(false);
    const authSet=useSetRecoilState(authAtom);


    const Signup = async ({ fullName, username, password, confirmPassword, gender }) => {

        const isValid = validateInputs({ fullName, username, password, confirmPassword, gender });
        if (!isValid) {
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
            
                headers: {
                    "Content-Type": "application/json",
                },


                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),

            });
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            authSet(data);
            
        } catch (error) {
            toast.error(error.message);

        }finally{
            setLoading(false);
        }
    };

 return {loading,Signup};
}


function validateInputs({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}



export default SignUpUser