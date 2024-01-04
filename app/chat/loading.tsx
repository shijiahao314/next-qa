import ChatContent from '@/components/chat/ChatCard';

export default function ChatBodyLoading() {
  return (
    <div className="flex flex-shrink flex-grow flex-col overflow-x-hidden overflow-y-hidden px-5 py-4">
      <div className="flex h-1/4 flex-row-reverse">
        <div className="mt-4 flex w-2/3 flex-col rounded-lg border-[1px] border-my-border bg-green-400/60 p-3 dark:border-my-darkborder dark:bg-green-700/80 md:max-w-[80%] md:border-2">
          <div className="h-[21px] w-1/3 animate-pulse rounded-md bg-gray-400/30"></div>
          <div className="mt-3 h-max w-full flex-shrink flex-grow animate-pulse rounded-md bg-gray-400/30"></div>
        </div>
      </div>
      <div className="flex flex-shrink flex-grow">
        <div className="mt-4 flex w-full flex-col rounded-lg border-[1px] border-my-border bg-my-bg p-3 dark:border-my-darkborder dark:bg-my-darkbg1 md:max-w-[80%] md:border-2">
          <div className="h-[21px] w-1/3 animate-pulse rounded-md bg-gray-400/30"></div>
          <div className="mt-3 h-1/4 w-full animate-pulse rounded-md bg-gray-400/30"></div>
          <div className="mt-3 h-[21px] w-2/3 animate-pulse rounded-md bg-gray-400/30"></div>
          <div className="mt-3 flex-shrink flex-grow animate-pulse rounded-md bg-gray-400/30"></div>
        </div>
      </div>
    </div>
  );
}
