type DateIndicatorProps = {
  message: IMessage;
  previousMessage?: IMessage;
};

import { IMessage } from "./chatBubble";
import { getRelativeDateTime, isSameDay } from "@/lib/utils";

function DateIndicator({ message, previousMessage }: DateIndicatorProps) {
  return (
    <>
      {!previousMessage ||
      !isSameDay(previousMessage._creationTime, message._creationTime) ? (
        <div className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 p-1 z-50 rounded-md bg-white dark:bg-gray-primary">
            {getRelativeDateTime(message, previousMessage)}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default DateIndicator;
