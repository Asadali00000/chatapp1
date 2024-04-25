import { TbLogout2 } from "react-icons/tb";
import UseLogout from "../../hooks/UseLogout";
function Logout() {
  const {loading,LogoutUser}=UseLogout();
  return (
    <div className="mt-auto">

{!loading ? (
				<TbLogout2 className='w-6 h-6 text-white cursor-pointer' onClick={LogoutUser} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
    
    </div>
  )
}

export default Logout