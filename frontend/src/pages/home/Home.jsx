import MessageContainer from "../../component/messageContainer/MessageContainer";
import Sidebar from "../../component/sidebar/Sidebar";

export const Home = () => {
	return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-1g bg-opacity-50'>

			<Sidebar />
            <MessageContainer>

            </MessageContainer>
			
		</div>
	);
};
