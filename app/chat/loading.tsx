export default function ChatBodyLoading() {
  return (
    <div className="flex shrink grow flex-col overflow-x-hidden overflow-y-hidden px-5 py-4">
      <div className="flex h-1/4 flex-row-reverse">
        <div className="border-my-border dark:border-my-darkborder mt-4 flex w-2/3 flex-col rounded-lg border bg-green-400/60 p-3 sm:max-w-[80%] sm:border-2 dark:bg-green-700/80">
          <div className="h-[21px] w-1/3 animate-pulse rounded-md bg-gray-400/30"></div>
          <div className="mt-3 h-max w-full shrink grow animate-pulse rounded-md bg-gray-400/30"></div>
        </div>
      </div>
      <div className="flex shrink grow">
        <div className="border-my-border bg-my-bg dark:border-my-darkborder dark:bg-my-dark-bg1 mt-4 flex w-full flex-col rounded-lg border p-3 sm:max-w-[80%] sm:border-2">
          <div className="h-[21px] w-1/3 animate-pulse rounded-md bg-gray-400/30"></div>
          <div className="mt-3 h-1/4 w-full animate-pulse rounded-md bg-gray-400/30"></div>
          <div className="mt-3 h-[21px] w-2/3 animate-pulse rounded-md bg-gray-400/30"></div>
          <div className="mt-3 shrink grow animate-pulse rounded-md bg-gray-400/30"></div>
        </div>
      </div>
    </div>
  );
}
