import { Link } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { loginAtom } from "../../context/atom/Atom"
import useLogin from "../../hooks/useLogin";

export const Login = () => {
    const setLoginDetails=useSetRecoilState(loginAtom);
    const setLoginDetailsValue=useRecoilValue(loginAtom);
    const {loading, loginUser}=useLogin();
  
  
    const loginUserDetails = async(e) => {
        e.preventDefault();

        await loginUser();
       

    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
                <form onSubmit={loginUserDetails}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                        <input type="text" id="username" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Username" required
                          onChange={(e)=>setLoginDetails((prevValues)=>({
                            ...prevValues,
                            username:e.target.value
                        }))} 
                        
                        
                        
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required 
                         onChange={(e)=>setLoginDetails((prevValues)=>({
                            ...prevValues,
                            password:e.target.value
                        }))} 
                        
                        />
                        <a href="#"
                            className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                            Password?</a>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" />

                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                        </div>
                        <Link to="/signup"
                            className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                            Account</Link>
                    </div>
                    <button onClick={loginUserDetails} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {loading ? <span className='loading loading-spinner '></span> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}
