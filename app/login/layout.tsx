'use client';

import { debounce } from 'lodash';

import Image from 'next/image';

import svg from '@/public/svgs/next-logo.svg';
import { useRouter } from 'next/navigation';
import { Login, LoginRequest, SignUp, SignUpRequest } from '../api/auth';
import { useRef, useState } from 'react';
import { Id, ToastContainer, toast } from 'react-toastify';
import Notification from '@/components/frame/Notification';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // input date
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // button disable
  const [clickable, setClickable] = useState<boolean>(true);

  // login
  const handleLogin = async () => {
    const toastId: Id = toast.info('发送中', { autoClose: false });
    setClickable(false);
    await sleep(1000);
    const loginRequest: LoginRequest = {
      username: formData.username,
      password: formData.password
    };
    const success = await Login(loginRequest);
    console.log('====================================');
    console.log('request: ', loginRequest);
    console.log('response:', success);
    console.log('====================================');
    if (success) {
      toast.update(toastId, {
        render: '登录成功，跳转中',
        type: toast.TYPE.SUCCESS,
        autoClose: 2000
      });
      await sleep(2000);
    } else {
      toast.update(toastId, {
        render: '登录失败',
        type: toast.TYPE.ERROR,
        autoClose: 3000
      });
      // toast.error('登录失败');
    }
  };
  // sign up
  const handleSignUp = async () => {
    const signUpRequest: SignUpRequest = {
      username: formData.username,
      password: formData.password
    };
    const [success, msg] = await SignUp(signUpRequest);
    console.log('====================================');
    console.log('request: ', signUpRequest);
    console.log('response: ', [success, msg]);
    console.log('====================================');
  };

  return (
    <>
      <Notification></Notification>
      <div className="hidden h-full w-full opacity-0"></div>
      <div className="flex h-full w-full flex-row text-my-text0 duration-200 dark:text-my-darktext0">
        {/* <div className="hidden h-full flex-shrink flex-grow sm:w-3/5 md:block">
        <div className="h-20 w-20">
          <Image
            className="bg-gray-500"
            width={100}
            height={100}
            src={svg}
            alt="nextjs logo"
          ></Image>
        </div>
      </div> */}
        <div className="m-4 flex w-full flex-col">
          <div className="flex w-full flex-row justify-start">
            <div
              className="absolute flex h-10 flex-row items-center justify-center rounded-lg border-2 border-my-border px-2 py-1 text-center text-sm hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2 md:hidden"
              role="button"
              onClick={() => router.push('/chat')}
            >
              <svg
                className="pr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                version="1.1"
                p-id="1596"
                width="20"
                height="20"
              >
                <path
                  d="M952.48 476.64L549.36 71.52a52.64 52.64 0 0 0-74.72 0l-83.2 81.2a8 8 0 0 1-12.4-1.52A52.48 52.48 0 0 0 336 128H248c-29.12 0-48 26.72-48 56v160L71.52 476.64a53.12 53.12 0 0 0 37.36 90.64L168 568a8 8 0 0 1 8 8v336a57.04 57.04 0 0 0 54.48 56h172.96c29.12 0 52.56-26.72 52.56-56V728a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v184c0 29.28 23.52 56 52.64 56H777.6a56.96 56.96 0 0 0 54.4-56V752a32 32 0 0 0-64 0v144a8 8 0 0 1-8 8H624a8 8 0 0 1-8-8V712a56.64 56.64 0 0 0-54-56H442.56C413.44 656 392 682.72 392 712v184a8 8 0 0 1-8 8H248a8 8 0 0 1-8-8V560c0-29.28-22.32-56.72-51.52-56.72l-32.8 0.48a8 8 0 0 1-5.76-13.68L248 392a59.28 59.28 0 0 0 16-40V200a8 8 0 0 1 8-8h49.84a8 8 0 0 1 7.52 5.28A54.48 54.48 0 0 0 360 231.2a52.56 52.56 0 0 0 57.6-11.52l88.72-86.24a8 8 0 0 1 11.2 0l356.8 356.8a8 8 0 0 1-5.68 13.68H800a32.72 32.72 0 0 0-33.44 31.28A34 34 0 0 0 800 568h112a57.76 57.76 0 0 0 51.92-33.52 53.12 53.12 0 0 0-11.44-57.84z"
                  fill="currentColor"
                  p-id="1597"
                />
                <path
                  d="M800 640m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
                  fill="currentColor"
                  p-id="1598"
                />
              </svg>
              主页
            </div>
          </div>
          <div className="flex flex-shrink flex-grow flex-col items-center justify-center">
            <div className="rounded-lg border-2 border-my-border bg-my-bg px-6 py-5 shadow-md dark:border-my-darkborder dark:bg-my-darkbg1 md:max-w-md">
              <div className="mb-3 flex h-20 items-center justify-center">
                <svg width="97" height="36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 13.389c0 7.394 5.994 13.388 13.389 13.388V0C5.994 0 0 5.994 0 13.389zm31.24 8.925c0-7.394-5.994-13.388-13.389-13.388v26.777c7.395 0 13.389-5.995 13.389-13.389zM77.35 2.168c0 .787-.695 1.424-1.553 1.424-.859 0-1.554-.637-1.554-1.424 0-.787.695-1.424 1.554-1.424.858 0 1.553.637 1.553 1.424zM45.174 7.743c-.307-2.194-2.337-3.28-4.715-3.28-2.296 0-4.387 1.127-4.387 3.382 0 1.558.902 2.583 2.357 2.994.555.16 1.184.331 1.877.52h.001l.87.238c.799.226 1.25.513 1.25 1.087 0 .717-.697 1.066-1.579 1.066-1.189 0-2.07-.574-2.296-1.66l-2.85.43c.431 2.521 2.297 3.628 5.085 3.628 2.522 0 4.49-1.291 4.49-3.587 0-1.886-1.128-2.747-3.486-3.342-.8-.205-1.332-.349-1.886-.513-.676-.205-1.066-.45-1.066-1.004s.759-.882 1.702-.84c1.004.04 1.68.614 1.783 1.393l2.85-.512zm3.836 3.342h7.77c.307-3.855-1.559-6.622-5.187-6.622-3.362 0-5.597 2.398-5.597 5.986 0 3.3 2.296 5.7 5.76 5.7 2.071 0 4.879-2.121 4.921-3.998h-2.788c-.43.922-1.271 1.394-2.296 1.394-1.497 0-2.378-.923-2.583-2.46zm2.583-4.203c1.578 0 2.173.738 2.357 2.05h-4.858c.266-1.23 1.004-2.05 2.5-2.05zM69.62 4.556c.922 0 1.813.235 2.51.973.964 1.004 1.066 2.152 1.066 3.567v6.745h-2.829V9.3c0-.8-.143-1.292-.533-1.722-.349-.39-.604-.543-1.137-.543s-.826.174-1.174.563c-.43.492-.513.984-.513 1.538v6.704h-2.829V9.3c0-.8-.143-1.292-.533-1.722-.348-.39-.633-.543-1.166-.543-.533 0-.796.174-1.145.563-.43.492-.513.984-.513 1.538v6.704h-2.808V4.77h2.46v1.188c.779-.922 1.699-1.403 2.929-1.403.922 0 1.842.235 2.54.973.204.225.389.45.512.676.779-1.066 1.81-1.65 3.163-1.65zm4.623.279V15.84h2.788V4.835h-2.788zM44.488 20.119v-3.755h2.808V30.82h-2.46v-1.036c-.348.777-1.763 1.343-2.993 1.343-3.054 0-5.105-2.521-5.105-5.842 0-3.383 2.071-5.843 5.249-5.843.984 0 1.804.246 2.5.676zm-4.797 5.167c0 1.865.8 3.362 2.603 3.362 1.866 0 2.542-1.353 2.542-3.362 0-2.01-.697-3.362-2.44-3.362-1.865 0-2.705 1.517-2.705 3.362zm11.451.779h7.77c.307-3.854-1.558-6.622-5.187-6.622-3.362 0-5.597 2.399-5.597 5.986 0 3.3 2.297 5.7 5.761 5.7 2.07 0 4.818-1.603 4.92-3.998h-2.788c-.43.922-1.27 1.394-2.296 1.394-1.496 0-2.378-.923-2.583-2.46zm2.583-4.203c1.579 0 2.173.738 2.358 2.05h-4.859c.267-1.23 1.005-2.05 2.501-2.05zm10.721-2.419c2.379 0 4.408 1.086 4.716 3.28l-2.85.513c-.102-.78-.779-1.353-1.784-1.394-.943-.041-1.701.287-1.701.84 0 .554.39.8 1.066 1.005.553.164 1.087.307 1.886.512 2.358.595 3.485 1.456 3.485 3.342 0 2.296-1.968 3.587-4.49 3.587-2.788 0-4.653-1.107-5.084-3.628l2.85-.43c.225 1.086 1.107 1.66 2.296 1.66.882 0 1.579-.349 1.579-1.066 0-.574-.452-.861-1.251-1.087l-.87-.237c-.694-.19-1.322-.36-1.877-.521-1.456-.41-2.358-1.435-2.358-2.993 0-2.256 2.091-3.383 4.388-3.383zm5.84.307v11.07h2.788V19.75h-2.788zm12.068.882v-.882h2.44v11.83c0 .553-.041 1.025-.164 1.496C84.097 35.106 81.8 36 79.36 36c-1.886 0-3.895-.94-4.736-2.375l2.584-1.25c.348.656 1.394 1 2.173 1 1.25 0 2.665-.606 2.624-1.837v-1.107c-.718.451-1.6.697-2.645.697-3.055 0-5.105-2.521-5.105-5.842 0-3.383 2.071-5.843 5.249-5.843 1.148 0 2.395.502 2.85 1.189zm-5.145 4.654c0 1.865.799 3.362 2.603 3.362 1.866 0 2.542-1.353 2.542-3.362 0-2.01-.697-3.362-2.44-3.362-1.865 0-2.706 1.517-2.706 3.362zm17.864-4.654c-1.066-1.046-2.398-1.271-3.71-1.189-1.005.061-2.132.43-2.85 1.291a1.172 1.172 0 01-.143.164V19.75h-2.46v11.07h2.808v-4.817c0-.758.02-1.62.123-2.111.123-.615.41-1.107.82-1.415.37-.266.8-.41 1.312-.43.759-.02 1.353.205 1.743.635.574.615.738 1.763.738 2.911v5.228h2.829v-5.35c0-1.723 0-3.65-1.21-4.839z"
                  ></path>
                </svg>
              </div>
              <div className="w-full space-y-3">
                <input
                  className="h-12 w-full rounded-lg border-2 border-my-border bg-my-bg px-2 dark:border-my-darkborder dark:bg-my-darkbg2"
                  placeholder="用户名..."
                  name="username"
                  value={formData.username}
                  onChange={handleChange}

                  // required
                ></input>
                <input
                  className="h-12 w-full rounded-lg border-2 border-my-border bg-my-bg px-2 dark:border-my-darkborder dark:bg-my-darkbg2"
                  placeholder="密码..."
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  // required
                ></input>
                <div className="flex flex-row space-x-2 ">
                  <button
                    className="h-10 flex-shrink flex-grow  rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                    onClick={debounce(handleLogin, 300, {
                      leading: true,
                      trailing: false
                    })}
                  >
                    登录
                  </button>
                  <button
                    className="h-10 rounded-lg border-2 border-my-border px-2 text-center text-sm hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2"
                    onClick={handleSignUp}
                  >
                    注册
                  </button>
                </div>
              </div>
              <div className="my-2 flex w-full items-center">
                <div className="h-[2px] flex-grow bg-my-border dark:bg-my-darkborder"></div>
                <div className="px-2 text-sm text-my-text3 dark:text-my-darktext3">或</div>
                <div className="h-[2px] flex-grow bg-my-border dark:bg-my-darkborder"></div>
              </div>
              <div className="flex flex-row items-center justify-center">
                <div
                  className="cursor-not-allowed rounded-lg border-[1px] border-my-border p-2 hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2"
                  role="button"
                  onClick={() => {
                    console.log('====================================');
                    console.log('clicked');
                    console.log('====================================');
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 98 96"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
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
      </div>
    </>
  );
}
