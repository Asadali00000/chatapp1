


import { BsSend } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messageInputAtom } from "../../context/atom/Atom";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput() {
    const setMessageInput=useSetRecoilState(messageInputAtom);
    const MessageValue=useRecoilValue(messageInputAtom);
    const {loading,sendMessage}=useSendMessage();
    const handleSubmit = async (e) => {
		e.preventDefault();
		if (!MessageValue) return;
        await sendMessage();
        setMessageInput("");
        
		
	};
    return (

     <form className="px-4 my-3" onSubmit={handleSubmit}>

        <div className="mt-auto">

            <div className="w-full relative">
                <input type="text" placeholder="Type here" className="input block input-bordered w-full "
                value={MessageValue} 
                 onChange={(e) => setMessageInput( e.target.value )}
                 />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
            </div>



        </div>
                 </form>

    )
}

export default MessageInput