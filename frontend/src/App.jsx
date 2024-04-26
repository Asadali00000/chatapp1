// import { Login } from "./pages/login/Login";
import {Navigate, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/signup/SignUp";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import {  useRecoilValue } from "recoil";
import { authAtom } from "./context/atom/Atom";


// import { SocketAtomInitialise } from "./context/atom/socketAtom";
export default function App() {
  const  userExist=useRecoilValue(authAtom);
  console.log(userExist);


  
  return (
    <div className='p-4 h-screen flex items-center justify-center' >
      <Routes>
        <Route path="/" element={userExist?<Home/>:<Navigate to={'/signup'}/> }   />
        <Route path="/signup" element={userExist?<Navigate to='/' />:<SignUp/>}   />
        <Route path="/login" element={userExist?<Navigate to='/'/>:<Login/>}   />
     
      </Routes>
      {/* <Toaster/> */}
    </div>
  )
}
