export default function Page() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="relative mb-[4px] flex flex-row items-center justify-between space-x-8 rounded-[2px] border-b-[3px] border-my-border px-[20px] py-[14px] dark:border-my-darkborder">
        <div className="flex flex-col space-y-[5px]">
          <h1 className="text-[24px]">设置</h1>
          <h2 className="text-my-text1 dark:text-my-darktext1">所有设置选项</h2>
        </div>
      </div>
      <div className="relative flex flex-shrink flex-grow flex-col overflow-auto overflow-x-hidden p-[20px]">
        <div className="mb-[20px] rounded-[10px] border-[3px] border-my-border dark:border-my-darkborder">
          <div className="flex min-h-[60px] flex-row items-center justify-between border-b-[2px] border-my-border px-[20px] py-[10px] dark:border-my-darkborder">
            <div>
              <div className="text-[14px] font-semibold text-my-text0 dark:text-my-darktext0">
                API Key
              </div>
              <div className="text-[12px] text-my-text1 dark:text-my-darktext1">
                使用自定义 OpenAI API Key 访问 ChatGPT
              </div>
            </div>
            <div>Right</div>
          </div>
          <div className="flex min-h-[60px] flex-row items-center justify-between border-b-[2px] border-my-border px-[20px] py-[10px] dark:border-my-darkborder">
            <div>
              <div className="text-[14px] font-semibold text-my-text0 dark:text-my-darktext0">
                API Key
              </div>
              <div className="text-[12px] text-my-text1 dark:text-my-darktext1">
                使用自定义 OpenAI API Key 访问 ChatGPT
              </div>
            </div>
            <div>
              <button></button>
              <input
                placeholder="OpenAI API Key"
                className="min-h-[36px] rounded-[10px] border-[1px] border-solid border-my-border bg-my-bg px-[10px] text-center text-[14px] dark:border-my-darkborder dark:bg-my-darkbg1"
                type="password"
              ></input>
            </div>
          </div>
          <div className="border-b-[0px] border-my-border px-[20px] py-[10px] leading-[40px] dark:border-my-darkborder">
            ccc
          </div>
        </div>
        <div className="mb-[20px] rounded-[10px] border-[3px] border-my-border dark:border-my-darkborder">
          <div className="border-b-[2px] border-my-border px-[20px] py-[10px] leading-[40px] dark:border-my-darkborder">
            aaa
          </div>
          <div className="border-b-[2px] border-my-border px-[20px] py-[10px] leading-[40px] dark:border-my-darkborder">
            bbb
          </div>
          <div className="border-b-[0px] border-my-border px-[20px] py-[10px] leading-[40px] dark:border-my-darkborder">
            ccc
          </div>
        </div>
      </div>
    </div>
  );
}
