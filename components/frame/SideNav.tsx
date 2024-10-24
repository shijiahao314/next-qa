'use client';

import SwitchModeButton from '../theme/switchMode';
import { usePathname, useRouter } from 'next/navigation';
import SettingButton from './settingsButton';
import UserStatus from './UserStatus';
import { useBearStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default function SideNav() {
  const navOpen = useBearStore(useShallow((state) => state.navOpen));
  const setNavOpen = useBearStore(useShallow((state) => state.setNavOpen));

  const pathname = usePathname();
  const router = useRouter();
  const defaultSvg = (
    <svg
      className={
        'aria-hidden h-5 w-5 fill-current ' +
        `${
          pathname === '/xxx'
            ? 'text-base-0 transition dark:text-base-8'
            : 'text-gray-500 transition group-hover:text-base-0 dark:text-gray-400 dark:group-hover:text-base-8'
        }`
      }
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M 11.134766 1.0175781 C 10.87173 1.0049844 10.606766 1.0088281 10.337891 1.0332031 C 8.1135321 1.2338971 6.3362243 2.7940749 5.609375 4.8203125 C 3.8970488 5.1768339 2.4372723 6.3048522 1.671875 7.9570312 C 0.73398779 9.9840533 1.1972842 12.30076 2.5878906 13.943359 C 2.0402591 15.605222 2.2856216 17.434472 3.3320312 18.921875 C 4.6182099 20.747762 6.8565685 21.504693 8.9746094 21.121094 C 10.139659 22.427613 11.84756 23.130452 13.662109 22.966797 C 15.886521 22.766098 17.663809 21.205995 18.390625 19.179688 C 20.102972 18.823145 21.563838 17.695991 22.330078 16.042969 C 23.268167 14.016272 22.805368 11.697142 21.414062 10.054688 C 21.960697 8.3934373 21.713894 6.5648387 20.667969 5.078125 C 19.38179 3.2522378 17.143432 2.4953068 15.025391 2.8789062 C 14.032975 1.7660011 12.646869 1.0899755 11.134766 1.0175781 z M 11.025391 2.5136719 C 11.921917 2.5488523 12.754993 2.8745885 13.431641 3.421875 C 13.318579 3.4779175 13.200103 3.5164101 13.089844 3.5800781 L 9.0761719 5.8964844 C 8.7701719 6.0724844 8.5801719 6.3989531 8.5761719 6.7519531 L 8.5175781 12.238281 L 6.75 11.189453 L 6.75 6.7851562 C 6.75 4.6491563 8.3075938 2.74225 10.433594 2.53125 C 10.632969 2.5115 10.83048 2.5060234 11.025391 2.5136719 z M 16.125 4.2558594 C 17.398584 4.263418 18.639844 4.8251563 19.417969 5.9101562 C 20.070858 6.819587 20.310242 7.9019929 20.146484 8.9472656 C 20.041416 8.8773528 19.948163 8.794144 19.837891 8.7304688 L 15.826172 6.4140625 C 15.520172 6.2380625 15.143937 6.2352031 14.835938 6.4082031 L 10.052734 9.1035156 L 10.076172 7.0488281 L 13.890625 4.8476562 C 14.584375 4.4471562 15.36085 4.2513242 16.125 4.2558594 z M 5.2832031 6.4726562 C 5.2752078 6.5985272 5.25 6.7203978 5.25 6.8476562 L 5.25 11.480469 C 5.25 11.833469 5.4362344 12.159844 5.7402344 12.339844 L 10.464844 15.136719 L 8.6738281 16.142578 L 4.859375 13.939453 C 3.009375 12.871453 2.1365781 10.567094 3.0175781 8.6210938 C 3.4795583 7.6006836 4.2963697 6.8535791 5.2832031 6.4726562 z M 15.326172 7.8574219 L 19.140625 10.060547 C 20.990625 11.128547 21.865375 13.432906 20.984375 15.378906 C 20.522287 16.399554 19.703941 17.146507 18.716797 17.527344 C 18.724764 17.401695 18.75 17.279375 18.75 17.152344 L 18.75 12.521484 C 18.75 12.167484 18.563766 11.840156 18.259766 11.660156 L 13.535156 8.8632812 L 15.326172 7.8574219 z M 12.025391 9.7109375 L 13.994141 10.878906 L 13.966797 13.167969 L 11.974609 14.287109 L 10.005859 13.121094 L 10.03125 10.832031 L 12.025391 9.7109375 z M 15.482422 11.761719 L 17.25 12.810547 L 17.25 17.214844 C 17.25 19.350844 15.692406 21.25775 13.566406 21.46875 C 12.449968 21.579344 11.392114 21.244395 10.568359 20.578125 C 10.681421 20.522082 10.799897 20.48359 10.910156 20.419922 L 14.923828 18.103516 C 15.229828 17.927516 15.419828 17.601047 15.423828 17.248047 L 15.482422 11.761719 z M 13.947266 14.896484 L 13.923828 16.951172 L 10.109375 19.152344 C 8.259375 20.220344 5.8270313 19.825844 4.5820312 18.089844 C 3.9291425 17.180413 3.6897576 16.098007 3.8535156 15.052734 C 3.9587303 15.122795 4.0516754 15.205719 4.1621094 15.269531 L 8.1738281 17.585938 C 8.4798281 17.761938 8.8560625 17.764797 9.1640625 17.591797 L 13.947266 14.896484 z"></path>
    </svg>
  );

  const items = [
    {
      pathname: '/kb',
      title: '知识库管理',
      svg: (
        <svg
          viewBox="0 0 1024 1024"
          className={
            'aria-hidden h-5 w-5 fill-current ' +
            `${
              pathname === '/kb'
                ? 'text-my-light transition'
                : 'text-gray-500 transition group-hover:text-base-0 dark:text-gray-400 dark:group-hover:text-base-8'
            }`
          }
          version="1.1"
        >
          <path
            d="M912.9 129.3H769.2c-24.9 0-45 20.1-45 45v677.8c0 24.9 20.1 45 45 45h143.7c24.9 0 45-20.1 45-45V174.3c0-24.8-20.1-45-45-45z m-27 72v466.9h-89.7V201.3h89.7z m-89.7 623.8v-84.9h89.7v84.9h-89.7zM636.8 129.3H493.1c-24.9 0-45 20.1-45 45v677.8c0 24.9 20.1 45 45 45h143.7c24.9 0 45-20.1 45-45V174.3c0-24.8-20.2-45-45-45z m-27 72v466.9h-89.7V201.3h89.7z m-89.7 623.8v-84.9h89.7v84.9h-89.7zM409.3 162.7l-140-32.5c-3.4-0.8-6.8-1.2-10.2-1.2-20.5 0-39 14.1-43.8 34.8L65.6 808.9c-5.6 24.2 9.5 48.4 33.7 54l140 32.5c3.4 0.8 6.8 1.2 10.2 1.2 20.5 0 39-14.1 43.8-34.8l116-499.9c0.3-1 0.6-2.1 0.9-3.2 0.2-1.1 0.4-2.1 0.6-3.2L443 216.6c5.6-24.1-9.5-48.3-33.7-53.9z m-130 43.7l87.4 20.3-18.7 80.6-87.4-20.3 18.7-80.6z m-50 612.8l-87.4-20.3 102.5-441.7 87.4 20.3-102.5 441.7z"
            p-id="4276"
          ></path>
        </svg>
      )
    },
    {
      pathname: '/qa',
      title: '知识库问答',
      svg: (
        <svg
          className={
            'aria-hidden h-5 w-5 fill-current ' +
            `${
              pathname === '/qa'
                ? 'text-my-light transition'
                : 'text-gray-500 transition group-hover:text-base-0 dark:text-gray-400 dark:group-hover:text-base-8'
            }`
          }
          viewBox="0 0 1231 1024"
        >
          <path d="M1177.738445 663.954058a51.073389 51.073389 0 0 1-36.262107-14.811283l-123.086867-123.086868a51.073389 51.073389 0 0 0-36.262107-14.811282H462.710998A153.220167 153.220167 0 0 1 309.49083 357.513723V153.220167a153.220167 153.220167 0 0 1 153.220168-153.220167h612.880668a153.220167 153.220167 0 0 1 153.220168 153.220167v204.293556a51.073389 51.073389 0 0 1-102.146778 0V153.220167a51.073389 51.073389 0 0 0-51.07339-51.073389H462.710998a51.073389 51.073389 0 0 0-51.073389 51.073389v204.293556a51.073389 51.073389 0 0 0 51.073389 51.07339h519.416366a153.220167 153.220167 0 0 1 108.275585 44.944582l123.086868 123.086868A51.073389 51.073389 0 0 1 1177.738445 663.954058zM105.197274 715.027447v-204.293556a51.073389 51.073389 0 0 1 51.073389-51.073389 51.073389 51.073389 0 0 0 0-102.146779 153.220167 153.220167 0 0 0-153.220167 153.220168v204.293556a51.073389 51.073389 0 0 0 102.146778 0z m-14.811283 291.629052l123.086868-123.086868a51.073389 51.073389 0 0 1 36.262106-15.322017H769.151332a153.220167 153.220167 0 0 0 153.220167-153.220167v-51.073389a51.073389 51.073389 0 0 0-102.146778 0v51.073389a51.073389 51.073389 0 0 1-51.073389 51.073389H249.734965a153.220167 153.220167 0 0 0-108.275585 44.944582L17.861779 934.132286A51.073389 51.073389 0 1 0 89.875257 1006.145765z"></path>
        </svg>
      )
    },
    {
      pathname: '/chat',
      title: '开放对话',
      svg: (
        <svg
          className={
            'aria-hidden h-5 w-5 fill-current ' +
            `${
              pathname === '/chat'
                ? 'text-my-light transition'
                : 'text-gray-500 transition group-hover:text-base-0 dark:text-gray-400 dark:group-hover:text-base-8'
            }`
          }
          viewBox="0 0 24 24"
        >
          <path d="M 11.134766 1.0175781 C 10.87173 1.0049844 10.606766 1.0088281 10.337891 1.0332031 C 8.1135321 1.2338971 6.3362243 2.7940749 5.609375 4.8203125 C 3.8970488 5.1768339 2.4372723 6.3048522 1.671875 7.9570312 C 0.73398779 9.9840533 1.1972842 12.30076 2.5878906 13.943359 C 2.0402591 15.605222 2.2856216 17.434472 3.3320312 18.921875 C 4.6182099 20.747762 6.8565685 21.504693 8.9746094 21.121094 C 10.139659 22.427613 11.84756 23.130452 13.662109 22.966797 C 15.886521 22.766098 17.663809 21.205995 18.390625 19.179688 C 20.102972 18.823145 21.563838 17.695991 22.330078 16.042969 C 23.268167 14.016272 22.805368 11.697142 21.414062 10.054688 C 21.960697 8.3934373 21.713894 6.5648387 20.667969 5.078125 C 19.38179 3.2522378 17.143432 2.4953068 15.025391 2.8789062 C 14.032975 1.7660011 12.646869 1.0899755 11.134766 1.0175781 z M 11.025391 2.5136719 C 11.921917 2.5488523 12.754993 2.8745885 13.431641 3.421875 C 13.318579 3.4779175 13.200103 3.5164101 13.089844 3.5800781 L 9.0761719 5.8964844 C 8.7701719 6.0724844 8.5801719 6.3989531 8.5761719 6.7519531 L 8.5175781 12.238281 L 6.75 11.189453 L 6.75 6.7851562 C 6.75 4.6491563 8.3075938 2.74225 10.433594 2.53125 C 10.632969 2.5115 10.83048 2.5060234 11.025391 2.5136719 z M 16.125 4.2558594 C 17.398584 4.263418 18.639844 4.8251563 19.417969 5.9101562 C 20.070858 6.819587 20.310242 7.9019929 20.146484 8.9472656 C 20.041416 8.8773528 19.948163 8.794144 19.837891 8.7304688 L 15.826172 6.4140625 C 15.520172 6.2380625 15.143937 6.2352031 14.835938 6.4082031 L 10.052734 9.1035156 L 10.076172 7.0488281 L 13.890625 4.8476562 C 14.584375 4.4471562 15.36085 4.2513242 16.125 4.2558594 z M 5.2832031 6.4726562 C 5.2752078 6.5985272 5.25 6.7203978 5.25 6.8476562 L 5.25 11.480469 C 5.25 11.833469 5.4362344 12.159844 5.7402344 12.339844 L 10.464844 15.136719 L 8.6738281 16.142578 L 4.859375 13.939453 C 3.009375 12.871453 2.1365781 10.567094 3.0175781 8.6210938 C 3.4795583 7.6006836 4.2963697 6.8535791 5.2832031 6.4726562 z M 15.326172 7.8574219 L 19.140625 10.060547 C 20.990625 11.128547 21.865375 13.432906 20.984375 15.378906 C 20.522287 16.399554 19.703941 17.146507 18.716797 17.527344 C 18.724764 17.401695 18.75 17.279375 18.75 17.152344 L 18.75 12.521484 C 18.75 12.167484 18.563766 11.840156 18.259766 11.660156 L 13.535156 8.8632812 L 15.326172 7.8574219 z M 12.025391 9.7109375 L 13.994141 10.878906 L 13.966797 13.167969 L 11.974609 14.287109 L 10.005859 13.121094 L 10.03125 10.832031 L 12.025391 9.7109375 z M 15.482422 11.761719 L 17.25 12.810547 L 17.25 17.214844 C 17.25 19.350844 15.692406 21.25775 13.566406 21.46875 C 12.449968 21.579344 11.392114 21.244395 10.568359 20.578125 C 10.681421 20.522082 10.799897 20.48359 10.910156 20.419922 L 14.923828 18.103516 C 15.229828 17.927516 15.419828 17.601047 15.423828 17.248047 L 15.482422 11.761719 z M 13.947266 14.896484 L 13.923828 16.951172 L 10.109375 19.152344 C 8.259375 20.220344 5.8270313 19.825844 4.5820312 18.089844 C 3.9291425 17.180413 3.6897576 16.098007 3.8535156 15.052734 C 3.9587303 15.122795 4.0516754 15.205719 4.1621094 15.269531 L 8.1738281 17.585938 C 8.4798281 17.761938 8.8560625 17.764797 9.1640625 17.591797 L 13.947266 14.896484 z"></path>
        </svg>
      )
    },
    {
      pathname: '/users',
      title: '用户管理',
      svg: (
        <svg
          viewBox="0 0 1109 1024"
          className={
            'aria-hidden h-5 w-5 fill-current ' +
            `${
              pathname === '/users'
                ? 'text-my-light transition'
                : 'text-gray-500 transition group-hover:text-base-0 dark:text-gray-400 dark:group-hover:text-base-8'
            }`
          }
        >
          <path d="M665.570715 853.340842a34.131832 34.131832 0 0 0 34.131831 34.131832h375.450147a34.131832 34.131832 0 0 0 0-68.263663h-375.450147a34.131832 34.131832 0 0 0-34.131831 34.131831zM1075.152693 955.736337h-375.450147a34.131832 34.131832 0 0 0 0 68.263663h375.450147a34.131832 34.131832 0 0 0 0-68.263663z" />
          <path d="M887.42762 757.771714a34.131832 34.131832 0 1 0 58.024113-35.497105A508.56429 508.56429 0 0 0 662.157532 501.100341a273.054652 273.054652 0 1 0-300.360118 0A512.66011 512.66011 0 0 0 0 989.868168a34.131832 34.131832 0 0 0 68.263663 0 443.71381 443.71381 0 0 1 819.163957-232.096454zM307.186484 273.099706a204.790989 204.790989 0 1 1 204.790989 204.790989 204.790989 204.790989 0 0 1-204.790989-204.790989z" />
        </svg>
      )
    }
    // { pathname: '1', title: '1', svg: defaultSvg },
    // { pathname: '2', title: '2', svg: defaultSvg },
    // { pathname: '3', title: '3', svg: defaultSvg },
    // { pathname: '4', title: '4', svg: defaultSvg },
    // { pathname: '5', title: '5', svg: defaultSvg },
    // { pathname: '6', title: '6', svg: defaultSvg },
    // { pathname: '7', title: '7', svg: defaultSvg },
    // { pathname: '8', title: '8', svg: defaultSvg },
    // { pathname: '9', title: '9', svg: defaultSvg },
    // { pathname: '0', title: '0', svg: defaultSvg }
  ];

  return (
    <>
      <div
        className={
          'absolute z-30 flex h-full transform flex-col justify-between border-my-border bg-my-bg px-4 transition-transform duration-300 dark:border-my-darkborder dark:bg-my-darkbg1 md:relative md:translate-x-0 md:border-r-2 ' +
          `${navOpen ? 'translate-x-0' : '-translate-x-full'}`
        }
      >
        <div
          onClick={() => {
            console.log('====================================');
            console.log('logo click');
            console.log('====================================');
            router.push('/welcome');
          }}
          className="relative flex flex-shrink-0 flex-grow-0 cursor-pointer flex-col items-center justify-center border-b-[1px] border-my-border px-2 pb-4 pt-8 dark:border-my-darkborder"
        >
          <svg className="h-12" viewBox="0 0 1024 1024">
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
        {/* <UserStatus></UserStatus> */}
        <div className="flex flex-shrink flex-grow flex-col items-center justify-center overflow-y-auto overflow-x-hidden border-b-[1px] border-my-border px-2 dark:border-my-darkborder">
          <ul className="space-y-2 py-2 font-medium" role="menu">
            {items.map((item) => (
              <li className="h-10" key={item.pathname}>
                <a
                  className={
                    'flex items-center px-3 py-2 ' +
                    `${
                      pathname === item.pathname
                        ? 'pointer-events-none cursor-default rounded-lg bg-my-secondary text-white dark:bg-my-darkSecondary'
                        : 'group rounded-lg hover:bg-my-bgHover dark:hover:bg-my-darkbgHover'
                    }`
                  }
                  href={item.pathname}
                >
                  {item.svg}
                  <span
                    className={
                      'ms-3 whitespace-nowrap ' + `${pathname === item.pathname ? '' : ''}`
                    }
                  >
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-shrink-0 flex-grow-0 flex-row justify-center space-x-2 py-6">
          <SwitchModeButton></SwitchModeButton>
          <SettingButton></SettingButton>
        </div>
      </div>
      <div
        className={
          'absolute z-20 h-screen w-screen bg-black/50 md:hidden ' +
          `${navOpen ? 'block' : 'hidden'}`
        }
        onClick={() => {
          setNavOpen(false);
        }}
      ></div>
    </>
  );
}
