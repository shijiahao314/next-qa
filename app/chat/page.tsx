import ChatBody from '@/components/chat/ChatBody';
import ChatCard from '@/components/frame/chatCard';
import HistoryChat from '@/components/frame/historyChat';

export default function MainPage() {
  return (
    <div className="flex h-screen w-full flex-row">
      <div className="flex w-full flex-col">
        <div className="relative mb-[4px] flex flex-row items-center justify-between space-x-8 rounded-[2px] border-b-[3px] border-my-border px-[20px] py-[14px] dark:border-my-darkborder">
          <div className="flex ">
            <h1 className="text-[32px]">ChatGPT-Next-Web</h1>
          </div>
          <div className="flex flex-row space-x-[10px]">
            <h2 className="">h2</h2>
            <h3 className="">h3</h3>
          </div>
        </div>

        <ChatBody></ChatBody>
        <div className="relative mt-[4px] block rounded-[2px] border-t-[3px] border-my-border px-[20px] pb-[10px] pt-[5px] dark:border-my-darkborder">
          <textarea
            className="mt-[10px] max-h-[300px] w-full flex-grow resize-none break-words rounded-[10px] border-[2px] border-my-border bg-my-bg pb-[15px] pl-[15px] pr-[120px] pt-[10px] font-sans text-[16px] outline-none dark:bg-my-darkbg1"
            placeholder="Shift+Enter发送，Enter换行"
            rows={4}
          ></textarea>
          <button className="absolute bottom-[32px] right-[40px] flex h-[50px] w-[80px] place-content-center items-center rounded-[10px] bg-my-button0 text-[16px] font-semibold text-my-darktext0 dark:bg-my-darkButton0 ">
            发&nbsp;送
          </button>
        </div>
      </div>
      <div className="border-[2px] border-my-border dark:border-my-darkborder">
        <HistoryChat></HistoryChat>
      </div>
    </div>
  );
}
