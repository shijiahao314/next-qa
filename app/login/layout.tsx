'use client';

import { debounce } from 'lodash';

import { useRouter } from 'next/navigation';
import { Login, SignUp } from '@/api/auth';
import { useEffect, useState } from 'react';
import { Id, ToastContainer, toast } from 'react-toastify';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useBearStore } from '@/lib/store';
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from '@/api/model/auth';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const setIsLogin = useBearStore((state) => state.setIgLogin);
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

  // login
  const handleLogin = async () => {
    const toastId: Id = toast.info('发送中', {
      toastId: 'tid',
      autoClose: false
    });
    const loginRequest: LoginRequest = {
      username: formData.username,
      password: formData.password
    };
    Login(loginRequest).then(([success, resp]: [boolean, LoginResponse]) => {
      if (success) {
        toast.update(toastId, {
          render: '登录成功，跳转中...',
          type: toast.TYPE.SUCCESS,
          autoClose: 1000,
          onClose: () => {
            setIsLogin(true);
            router.push('/chat');
          }
        });
        // await sleep(2000);
      } else {
        toast.update(toastId, {
          render: '登录失败: ' + resp.msg,
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
      }
    });
  };
  // sign up
  const handleSignUp = () => {
    const toastId: Id = toast.info('发送中', {
      toastId: 'tid',
      autoClose: false
    });
    const signUpRequest: SignUpRequest = {
      username: formData.username,
      password: formData.password
    };
    console.log('====================================');
    console.log(toastId);
    console.log('====================================');
    SignUp(signUpRequest).then(([success, resp]: [boolean, SignUpResponse]) => {
      console.log('====================================');
      console.log(success);
      console.log('====================================');
      if (success) {
        toast.update(toastId, {
          render: '注册成功，已登录，跳转中...',
          type: toast.TYPE.SUCCESS,
          autoClose: 1000,
          onClose: () => {
            setIsLogin(true);
            router.push('/chat');
          }
        });
      } else {
        toast.update(toastId, {
          render: '注册失败: ' + resp.msg,
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
      }
    });
  };

  return (
    <>
      <head>
        <title>NextQA - 登录</title>
      </head>
      <MyToastContainer></MyToastContainer>
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
              <div className="mb-3 flex h-20 flex-row items-center justify-center space-x-3">
                <svg className="h-9" viewBox="0 0 1024 1024">
                  <path
                    d="M850.34568 1023.999787a54.186509 54.186509 0 0 1-36.266561-15.573288L669.226208 874.666889a46.079866 46.079866 0 0 0-27.306587-10.879968h-149.332898a36.906559 36.906559 0 0 1-36.906559-29.653247 35.626563 35.626563 0 0 1 34.773232-42.666542h194.132767l138.879595 129.279622V789.333804h127.999627V380.161665h-115.839662a37.119892 37.119892 0 0 1-37.119892-29.653247 35.626563 35.626563 0 0 1 34.986565-42.666543h123.519639a65.27981 65.27981 0 0 1 63.999814 65.493143v422.185435a65.066477 65.066477 0 0 1-63.999814 65.493142H895.99888v111.573008a49.706522 49.706522 0 0 1-27.51992 47.786528 42.666542 42.666542 0 0 1-17.279949 3.626656z"
                    fill="#0077F0"
                    opacity=".5"
                    p-id="21296"
                  />
                  <path
                    d="M789.332524 64.002587v486.611914H399.786994a63.999813 63.999813 0 0 0-42.666542 16.853284l-153.38622 140.159591v-93.013062a63.999813 63.999813 0 0 0-63.999813-63.999813H64.001307V64.002587h725.331217m32.21324-63.999814h-789.331031A31.786574 31.786574 0 0 0 0.001493 31.789347v551.038393a31.786574 31.786574 0 0 0 31.786574 31.786574h107.946352v166.399515a31.786574 31.786574 0 0 0 31.999907 31.786574 31.359909 31.359909 0 0 0 21.333271-8.319976l206.719397-189.866113h421.75877A31.786574 31.786574 0 0 0 853.332338 582.82774V31.789347A31.786574 31.786574 0 0 0 821.545764 0.002773z"
                    fill="#0077F0"
                    p-id="21297"
                  />
                </svg>
                <div className="text-2xl font-semibold italic">NextQA</div>
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
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  // required
                ></input>
                <div className="flex flex-row space-x-2">
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
                <a
                  // href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL}`}
                  // href="/api/auth/login"
                  className="rounded-lg border-[1px] border-my-border p-2 hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2"
                  role="button"
                  onClick={() => {
                    console.log('====================================');
                    console.log('clicked');
                    console.log('====================================');
                    signIn();
                    // getProviders().then((providers: any) => console.log('Providers', providers));
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 98 96">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                      //   fill="#fff #24292f" // #24292f
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
