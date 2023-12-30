'use client';

import Image from 'next/image';

import svg from '@/public/svgs/next-logo.svg';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-row text-my-text0 duration-200 dark:text-my-darktext0">
      <div className="hidden h-full flex-shrink flex-grow sm:w-3/5 md:block">
        <div className="h-20 w-20">
          {/* <Image
            className="bg-gray-500"
            width={100}
            height={100}
            src={svg}
            alt="nextjs logo"
          ></Image> */}
        </div>
      </div>
      <div className="m-4 flex flex-shrink flex-grow flex-col items-center justify-center">
        <div className="rounded-lg border-2 border-my-border bg-my-bg px-6 pb-5 pt-5 shadow-md dark:border-my-darkborder dark:bg-my-darkbg1 md:max-w-md">
          <div className="flex h-20 items-center justify-center">
            <svg width="97" height="36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 13.389c0 7.394 5.994 13.388 13.389 13.388V0C5.994 0 0 5.994 0 13.389zm31.24 8.925c0-7.394-5.994-13.388-13.389-13.388v26.777c7.395 0 13.389-5.995 13.389-13.389zM77.35 2.168c0 .787-.695 1.424-1.553 1.424-.859 0-1.554-.637-1.554-1.424 0-.787.695-1.424 1.554-1.424.858 0 1.553.637 1.553 1.424zM45.174 7.743c-.307-2.194-2.337-3.28-4.715-3.28-2.296 0-4.387 1.127-4.387 3.382 0 1.558.902 2.583 2.357 2.994.555.16 1.184.331 1.877.52h.001l.87.238c.799.226 1.25.513 1.25 1.087 0 .717-.697 1.066-1.579 1.066-1.189 0-2.07-.574-2.296-1.66l-2.85.43c.431 2.521 2.297 3.628 5.085 3.628 2.522 0 4.49-1.291 4.49-3.587 0-1.886-1.128-2.747-3.486-3.342-.8-.205-1.332-.349-1.886-.513-.676-.205-1.066-.45-1.066-1.004s.759-.882 1.702-.84c1.004.04 1.68.614 1.783 1.393l2.85-.512zm3.836 3.342h7.77c.307-3.855-1.559-6.622-5.187-6.622-3.362 0-5.597 2.398-5.597 5.986 0 3.3 2.296 5.7 5.76 5.7 2.071 0 4.879-2.121 4.921-3.998h-2.788c-.43.922-1.271 1.394-2.296 1.394-1.497 0-2.378-.923-2.583-2.46zm2.583-4.203c1.578 0 2.173.738 2.357 2.05h-4.858c.266-1.23 1.004-2.05 2.5-2.05zM69.62 4.556c.922 0 1.813.235 2.51.973.964 1.004 1.066 2.152 1.066 3.567v6.745h-2.829V9.3c0-.8-.143-1.292-.533-1.722-.349-.39-.604-.543-1.137-.543s-.826.174-1.174.563c-.43.492-.513.984-.513 1.538v6.704h-2.829V9.3c0-.8-.143-1.292-.533-1.722-.348-.39-.633-.543-1.166-.543-.533 0-.796.174-1.145.563-.43.492-.513.984-.513 1.538v6.704h-2.808V4.77h2.46v1.188c.779-.922 1.699-1.403 2.929-1.403.922 0 1.842.235 2.54.973.204.225.389.45.512.676.779-1.066 1.81-1.65 3.163-1.65zm4.623.279V15.84h2.788V4.835h-2.788zM44.488 20.119v-3.755h2.808V30.82h-2.46v-1.036c-.348.777-1.763 1.343-2.993 1.343-3.054 0-5.105-2.521-5.105-5.842 0-3.383 2.071-5.843 5.249-5.843.984 0 1.804.246 2.5.676zm-4.797 5.167c0 1.865.8 3.362 2.603 3.362 1.866 0 2.542-1.353 2.542-3.362 0-2.01-.697-3.362-2.44-3.362-1.865 0-2.705 1.517-2.705 3.362zm11.451.779h7.77c.307-3.854-1.558-6.622-5.187-6.622-3.362 0-5.597 2.399-5.597 5.986 0 3.3 2.297 5.7 5.761 5.7 2.07 0 4.818-1.603 4.92-3.998h-2.788c-.43.922-1.27 1.394-2.296 1.394-1.496 0-2.378-.923-2.583-2.46zm2.583-4.203c1.579 0 2.173.738 2.358 2.05h-4.859c.267-1.23 1.005-2.05 2.501-2.05zm10.721-2.419c2.379 0 4.408 1.086 4.716 3.28l-2.85.513c-.102-.78-.779-1.353-1.784-1.394-.943-.041-1.701.287-1.701.84 0 .554.39.8 1.066 1.005.553.164 1.087.307 1.886.512 2.358.595 3.485 1.456 3.485 3.342 0 2.296-1.968 3.587-4.49 3.587-2.788 0-4.653-1.107-5.084-3.628l2.85-.43c.225 1.086 1.107 1.66 2.296 1.66.882 0 1.579-.349 1.579-1.066 0-.574-.452-.861-1.251-1.087l-.87-.237c-.694-.19-1.322-.36-1.877-.521-1.456-.41-2.358-1.435-2.358-2.993 0-2.256 2.091-3.383 4.388-3.383zm5.84.307v11.07h2.788V19.75h-2.788zm12.068.882v-.882h2.44v11.83c0 .553-.041 1.025-.164 1.496C84.097 35.106 81.8 36 79.36 36c-1.886 0-3.895-.94-4.736-2.375l2.584-1.25c.348.656 1.394 1 2.173 1 1.25 0 2.665-.606 2.624-1.837v-1.107c-.718.451-1.6.697-2.645.697-3.055 0-5.105-2.521-5.105-5.842 0-3.383 2.071-5.843 5.249-5.843 1.148 0 2.395.502 2.85 1.189zm-5.145 4.654c0 1.865.799 3.362 2.603 3.362 1.866 0 2.542-1.353 2.542-3.362 0-2.01-.697-3.362-2.44-3.362-1.865 0-2.706 1.517-2.706 3.362zm17.864-4.654c-1.066-1.046-2.398-1.271-3.71-1.189-1.005.061-2.132.43-2.85 1.291a1.172 1.172 0 01-.143.164V19.75h-2.46v11.07h2.808v-4.817c0-.758.02-1.62.123-2.111.123-.615.41-1.107.82-1.415.37-.266.8-.41 1.312-.43.759-.02 1.353.205 1.743.635.574.615.738 1.763.738 2.911v5.228h2.829v-5.35c0-1.723 0-3.65-1.21-4.839z"
              ></path>
            </svg>
          </div>
          <form className="w-full space-y-3">
            <input
              className="h-12 w-full rounded-lg border-2 border-my-border bg-my-bg px-2 dark:border-my-darkborder dark:bg-my-darkbg2"
              placeholder="用户名..."
            ></input>
            <input
              className="h-12 w-full rounded-lg border-2 border-my-border bg-my-bg px-2 dark:border-my-darkborder dark:bg-my-darkbg2"
              placeholder="密码..."
            ></input>
            <div className="flex flex-row space-x-2 ">
              <button className="h-10 flex-shrink flex-grow rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover">
                <label>登录</label>
              </button>
              <button className="h-10 rounded-lg border-2 border-my-border px-2 text-center text-sm hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2">
                <label>注册</label>
              </button>
            </div>
          </form>
          <div className="my-2 flex w-full items-center">
            <div className="h-[2px] flex-grow bg-my-border dark:bg-my-darkborder"></div>
            <div className="px-2 text-sm text-my-text3 dark:text-my-darktext3">或</div>
            <div className="h-[2px] flex-grow bg-my-border dark:bg-my-darkborder"></div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div
              className="rounded-lg border-[1px] border-my-border p-2 hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2"
              role="button"
              onClick={() => {
                console.log('====================================');
                console.log('clicked');
                console.log('====================================');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 98 96">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                  //   fill="#fff #24292f" // #24292f
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
