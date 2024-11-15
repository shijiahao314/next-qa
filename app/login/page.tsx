'use client';

import { Login, SignUp } from '@/action/auth';
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from '@/action/model/auth';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useBearStore } from '@/lib/store';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function LoginPage({ children }: { children: React.ReactNode }) {
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
        console.log('====================================');
        console.log('push');
        console.log('====================================');
        toast.update(toastId, {
          render: '登录成功，跳转中...',
          type: toast.TYPE.SUCCESS,
          autoClose: 1000,
          onClose: () => {
            setIsLogin(true);
            router.push('/chat');
          }
        });
        return;
      }
      toast.update(toastId, {
        render: '登录失败: ' + resp.msg,
        type: toast.TYPE.ERROR,
        autoClose: 2000
      });
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
    SignUp(signUpRequest).then(([success, resp]: [boolean, SignUpResponse]) => {
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
      <title>NextQA-登录</title>
      <MyToastContainer></MyToastContainer>
      <div className="hidden h-full w-full opacity-0"></div>
      <div className="flex h-full w-full flex-row text-my-text0 duration-200 dark:text-my-darktext0">
        <div className="m-4 flex w-full flex-col">
          <div className="flex flex-shrink flex-grow flex-col items-center justify-center">
            <div className="rounded-lg border border-my-border bg-my-bg px-6 py-5 shadow-md dark:border-my-darkborder dark:bg-my-darkbg1 sm:max-w-md">
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
                  className="h-12 w-full rounded-lg border border-my-border bg-my-bg px-2 dark:border-my-darkborder dark:bg-my-darkbg2"
                  placeholder="用户名..."
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  // required
                ></input>
                <input
                  className="h-12 w-full rounded-lg border border-my-border bg-my-bg px-2 dark:border-my-darkborder dark:bg-my-darkbg2"
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
                    className="h-10 rounded-lg border border-my-border px-2 text-center text-sm hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2"
                    onClick={handleSignUp}
                  >
                    注册
                  </button>
                </div>
              </div>
              <div className="my-2 flex w-full items-center">
                <div className="h-[1px] flex-grow bg-my-border dark:bg-my-darkborder"></div>
                <div className="px-2 text-sm text-my-text3 dark:text-my-darktext3">或</div>
                <div className="h-[1px] flex-grow bg-my-border dark:bg-my-darkborder"></div>
              </div>
              <div className="flex flex-row items-center justify-center gap-4">
                {/* with github */}
                <a
                  href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET}`}
                  className="rounded-lg border border-my-border p-2 hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2"
                  role="button"
                >
                  <svg width="24" height="24" viewBox="0 0 98 96">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                      //   fill="#fff #24292f" // #24292f
                      fill="currentColor"
                    />
                  </svg>
                </a>
                {/* with google */}
                <a
                  href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET}`}
                  className="rounded-lg border border-my-border p-2 hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2"
                  role="button"
                >
                  <svg width="24" height="24" viewBox="0 0 1024 1024">
                    <path
                      d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88"
                      fill="#EA4335"
                    ></path>
                    <path
                      d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667"
                      fill="#4285F4"
                    ></path>
                  </svg>
                </a>
                {/* with wechat */}
                <a
                  href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET}`}
                  className="rounded-lg border border-my-border p-2 hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbg2"
                  role="button"
                >
                  <svg width="24" height="24" viewBox="0 0 1024 1024">
                    <path
                      d="M208.979592 1024h606.040816c115.461224 0 208.979592-93.518367 208.979592-208.979592V208.979592C1024 93.518367 930.481633 0 815.020408 0H208.979592C93.518367 0 0 93.518367 0 208.979592v606.040816c0 115.461224 93.518367 208.979592 208.979592 208.979592z"
                      fill="#03DB6C"
                    ></path>
                    <path
                      d="M308.558367 226.429388c83.382857-29.257143 175.333878-21.420408 252.656327 21.420408l-0.731429-0.313469c58.514286 30.72 100.728163 85.472653 115.461225 150.047346a265.404082 265.404082 0 0 0-197.799184 65.097143c-31.764898 28.630204-53.080816 66.873469-60.604082 108.878368-4.91102 30.406531-2.089796 61.44 8.045715 90.383673-37.929796 1.149388-75.859592-4.284082-112.117551-15.986939l-89.025306 48.169796c8.881633-26.226939 16.927347-52.349388 26.122449-78.576326a235.091592 235.091592 0 0 1-98.533878-134.478368c-12.747755-51.2-4.075102-105.430204 24.032653-149.942857 31.137959-48.901224 77.844898-85.786122 132.493061-104.698775z m217.547755 97.802449c-10.03102-7.209796-22.987755-9.195102-34.690612-5.22449a37.616327 37.616327 0 0 0-23.614694 29.152653c-2.089796 13.270204 3.030204 26.540408 13.479184 35.004082 10.762449 8.672653 25.39102 10.762449 38.138776 5.224489a37.302857 37.302857 0 0 0 22.256326-31.451428v-1.253878c0.20898-12.434286-5.642449-24.137143-15.56898-31.451428z m-217.547755-3.866123c-16.718367 6.060408-26.853878 23.092245-24.346122 40.751021a37.626776 37.626776 0 0 0 34.795102 32.287347c17.763265 1.149388 33.854694-10.34449 38.661224-27.480817 3.239184-13.583673-1.044898-27.794286-11.284898-37.198367-10.13551-9.404082-24.659592-12.643265-37.825306-8.359184z m461.740409 119.118368a201.247347 201.247347 0 0 1 93.831836 96.026122v-1.044898c19.644082 45.244082 17.972245 96.966531-4.702041 140.852245a218.770286 218.770286 0 0 1-68.440816 75.546122c6.791837 21.733878 13.583673 42.422857 20.58449 64.156735-25.286531-11.807347-47.020408-27.480816-73.142857-37.929796-42.840816 14.001633-88.398367 17.136327-132.702041 9.195102a220.891429 220.891429 0 0 1-149.733878-98.429387 160.956082 160.956082 0 0 1-20.37551-121.208164c13.061224-55.902041 50.886531-102.713469 102.71347-127.164081a255.038694 255.038694 0 0 1 231.967347 0zM561.737143 522.44898c-8.986122 12.016327-7.732245 28.943673 2.925714 39.497142a29.988571 29.988571 0 0 0 49.110204-10.448979 30.197551 30.197551 0 0 0-13.374694-37.302857 30.093061 30.093061 0 0 0-38.661224 8.254694z m168.64653-10.971429c-15.986939 0-25.077551 14.837551-28.525714 28.734694 1.358367 8.045714 4.806531 15.56898 10.24 21.733877 6.896327 6.582857 16.613878 9.508571 26.017959 7.941225 9.404082-1.671837 17.554286-7.523265 22.047347-16.091429 4.493061-9.717551 3.552653-21.106939-2.612245-29.884081a29.80049 29.80049 0 0 0-27.167347-12.434286z"
                      fill="#FFFFFF"
                    ></path>
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
