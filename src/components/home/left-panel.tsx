
import { ListFilter, LogOut, MessageSquareDiff, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitch from "./ThemeSwitch";
import Conversation from "./conversation";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import UserListDialog from "./user-list-dialogue";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";


function LeftPanel() {

  const {isAuthenticated} = useConvexAuth();
  const conversations = useQuery(api.conversations.getMyConversation,
    isAuthenticated ? undefined: 'skip'
  );

  return (
    <div className="w-1/4 border-gray-600 border-r">
      <div className="stiky top-0 bg-left-panel z-10">
        {/* {Header} */}
        <div className="flex justify-between bg-gray-primary p-3 items-center">
          <UserButton />
          <div className="flex items-center gap-3">
           { isAuthenticated &&  <UserListDialog />}
            <ThemeSwitch />
          </div>
        </div>

        <div className="p-3 flex items-center">
          {/* {Search} */}
          <div className="relative h-10 mx-3 flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={18} />
            <Input type="text" placeholder="Search or start a new char" className="pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent" />
          </div>
            <ListFilter className="cursor-pointer"/>
        </div>
      </div>

      {/* {all chat list} */}

      <div className='my-3 flex flex-col gap-0 max-h-[80%] overflow-auto'>
				{/* Conversations will go here*/}
        {conversations?.map((convo)=> ( <Conversation key={convo._id} conversation={convo}/>))}
				{conversations?.length === 0 && (
					<>
						<p className='text-center text-gray-500 text-sm mt-3'>No conversations yet</p>
						<p className='text-center text-gray-500 text-sm mt-3 '>
							We understand {"you're"} an introvert, but {"you've"} got to start somewhere 😊
						</p>
					</>
				)}
			</div>
    </div>
  )
}

export default LeftPanel;
