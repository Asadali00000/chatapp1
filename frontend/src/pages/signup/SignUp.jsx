import { Link } from 'react-router-dom'
import { GenderCheck } from './GenderCheck'
import  { useState } from 'react';
import SignUpUser from '../../hooks/SignUpUser';

export const SignUp = () => {
    const [inputs,setInputs]=useState({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"",
    })
    const {loading,Signup}=SignUpUser();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log(inputs);
        await Signup(inputs);
        
    }
    const handleGender = (gender) => {
        setInputs({ ...inputs, gender });
      };
      
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Create Account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                        <input type="text" id="fullName" className="shadow-sm rounded-md w-full px-5 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Name" required 
                            value={inputs.fullName}
                            onChange={(e)=>setInputs({...inputs,fullName:e.target.value})} >
                        </input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                        <input type="text" id="username" className="shadow-sm rounded-md w-full px-5 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Username" required
                        value={inputs.username}
                            onChange={(e)=>setInputs({...inputs,username:e.target.value})}>
                        </input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input type="password" id="password" className="shadow-sm rounded-md w-full px-5 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required 
                        value={inputs.password}
                            onChange={(e)=>setInputs({...inputs,password:e.target.value})}>
                        </input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm password</label>
                        <input type="password" id="confirmPassword" className="shadow-sm rounded-md w-full px-5 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter the same  password" required 
                            value={inputs.confirmPassword}
                            onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}>
                        </input>

                    </div>
                    <GenderCheck  onCheckBoxChange={handleGender}  selectedGender={inputs.gender}  />
                    

                    <button onClick="hello" type="submit" className="mb-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Signup</button>
                    <div className="flex items-center justify-center mb-2">
                        <label htmlFor="loginLink" className="text-xs text-gray-700 dark:text-gray-300">Already have an account? </label>
                        <Link id="loginLink" to="/login" className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</Link>
                    </div>


                </form>
            </div>
        </div>
    )
}
