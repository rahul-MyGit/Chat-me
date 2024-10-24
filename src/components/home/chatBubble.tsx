import { useConvoStore } from "@/store/chat-store";
import { Id } from "../../../convex/_generated/dataModel";
import { MessageSeenSvg } from "@/lib/svgs";
import ChatBubbleAvator from "./ChatBubbleAvator";
import DateIndicator from "./DateIndicator";
import Image from "next/image";

export interface IMessage {
  _id: string;
  content: string;
  _creationTime: number;
  messageType: "text" | "image" | "video";
  sender: {
    _id: Id<"users">;
    image: string;
    name?: string;
    tokenIdentifier: string;
    email: string;
    _creationTime: number;
    isOnline: boolean;
  };
}

type ChatProps = {
  message: IMessage;
  me: any;
  previousMessage?: IMessage;
};

const ChatBubble = ({ me, message, previousMessage }: ChatProps) => {
  const date = new Date(message._creationTime);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const time = `${hour}:${minute}`;

  const { selectedConversation } = useConvoStore();
  const isMember =
    selectedConversation?.participants.includes(message.sender._id) || false;
  const isGroup = selectedConversation?.isGroup;
  const fromMe = message.sender._id === me._id;
  const bgClass = fromMe ? "bg-green-chat" : "bg-white dark:bg-gray-primary";

  if (!fromMe) {
    return (
      <>
        <DateIndicator message={message} previousMessage={previousMessage} />
        <div className="flex gap-1 w-2/3">
          <ChatBubbleAvator
            isGroup={isGroup}
            isMember={isMember}
            message={message}
          />
          <div
            className={`flex flex-col z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}
          >
            <OtherMessageIndicator />
            {message.messageType === 'text' && 
            <TextMessage message={message} />
          }
          {message.messageType === 'image' && 
            <ImageMessage message={message} />
          }

            <MessageTime time={time} fromMe={fromMe} />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <DateIndicator message={message} previousMessage={previousMessage} />
      <div className="flex gap-1 w-2/3 ml-auto">
        <div
          className={`flex z-20 max-w-fit px-2 pt-1 rounded-md ml-auto shadow-md relative ${bgClass}`}
        >
          <SelfMessageIndicator />
          {message.messageType === 'text' && 
            <TextMessage message={message} />
          }
          {message.messageType === 'image' && 
            <ImageMessage message={message} />
          }
          <MessageTime time={time} fromMe={fromMe} />
        </div>
      </div>
    </>
  );
};
export default ChatBubble;

const ImageMessage = ({message} :{message: IMessage}) => {
  return (
    <div className="w-[250px] h-[250px] m-2 relative">
      <Image
        src={message.content}
        fill
        alt="image"
        className="object-cover cursor-pointer rounded"
      />
    </div>
  );
}

const SelfMessageIndicator = () => (
  <div className="absolute bg-green-chat top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden" />
);

const MessageTime = ({ time, fromMe }: { time: string; fromMe: boolean }) => {
  return (
    <p className="text-[10px] mt-2 self-end flex gap-1 items-center">
      {time} {fromMe && <MessageSeenSvg />}
    </p>
  );
};

const OtherMessageIndicator = () => (
  <div className="absolute bg-white dark:bg-gray-primary top-0 -left-[4px] w-3 h-3 rounded-bl-full" />
);

const TextMessage = ({ message }: { message: IMessage }) => {
  //content is url or not [GPTed]
  const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.content);

  return (
    <div>
      {isLink ? (
        <a
          href={message.content}
          target="_blank"
          rel="noopener noreferrer"
          className={`mr-2 text-sm font-light text-blue-400 underline`}
        >
          {message.content}
        </a>
      ) : (
        <p className={`mr-2 text-sm font-light`}>{message.content}</p>
      )}
    </div>
  );
};
