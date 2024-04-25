import ConversationList from "./ConversationList"
import Logout from "./Logout"
import SearchBar from "./SearchBar"


function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
    <SearchBar />
    <div className='divider px-4'></div>
      <ConversationList></ConversationList>
      <Logout></Logout>
</div>
  )
}

export default Sidebar