'use client';

import SwitchModeButton from '../theme/switchMode';
import { usePathname } from 'next/navigation';
import SettingButton from './settingsButton';
import UserStatus from './UserStatus';
import { useBearStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default function SideNav() {
  const navOpen = useBearStore(useShallow((state) => state.navOpen));
  const setNavOpen = useBearStore(useShallow((state) => state.setNavOpen));

  const pathname = usePathname();
  const defaultSvg = (
    <svg
      className={
        'aria-hidden h-5 w-5 fill-current ' +
        `${
          pathname === '/test'
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
  const aStyle_active =
    'bg-my-bgHover dark:bg-my-darkbgHover flex items-center rounded-lg p-2 cursor-default pointer-events-none text-base-0 dark:text-base-8';
  const aStyle =
    'hover:bg-my-bgHover dark:hover:bg-my-darkbgHover group flex items-center rounded-lg p-2';
  const svgStyle_active =
    'fill-current aria-hidden text-base-0 dark:text-base-8 h-5 w-5 transition';
  const svgStyle =
    'fill-current aria-hidden group-hover:text-base-0 dark:group-hover:text-base-8 h-5 w-5 text-gray-500 transition dark:text-gray-400';

  const items = [
    {
      pathname: '/qa',
      title: '知识库问答',
      svg: (
        <svg
          className={
            'aria-hidden h-5 w-5 fill-current ' +
            `${
              pathname === '/qa'
                ? 'text-base-0 transition dark:text-base-8'
                : 'text-gray-500 transition group-hover:text-base-0 dark:text-gray-400 dark:group-hover:text-base-8'
            }`
          }
          xmlns="http://www.w3.org/2000/svg"
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
                ? 'text-base-0 transition dark:text-base-8'
                : 'text-gray-500 transition group-hover:text-base-0 dark:text-gray-400 dark:group-hover:text-base-8'
            }`
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M 11.134766 1.0175781 C 10.87173 1.0049844 10.606766 1.0088281 10.337891 1.0332031 C 8.1135321 1.2338971 6.3362243 2.7940749 5.609375 4.8203125 C 3.8970488 5.1768339 2.4372723 6.3048522 1.671875 7.9570312 C 0.73398779 9.9840533 1.1972842 12.30076 2.5878906 13.943359 C 2.0402591 15.605222 2.2856216 17.434472 3.3320312 18.921875 C 4.6182099 20.747762 6.8565685 21.504693 8.9746094 21.121094 C 10.139659 22.427613 11.84756 23.130452 13.662109 22.966797 C 15.886521 22.766098 17.663809 21.205995 18.390625 19.179688 C 20.102972 18.823145 21.563838 17.695991 22.330078 16.042969 C 23.268167 14.016272 22.805368 11.697142 21.414062 10.054688 C 21.960697 8.3934373 21.713894 6.5648387 20.667969 5.078125 C 19.38179 3.2522378 17.143432 2.4953068 15.025391 2.8789062 C 14.032975 1.7660011 12.646869 1.0899755 11.134766 1.0175781 z M 11.025391 2.5136719 C 11.921917 2.5488523 12.754993 2.8745885 13.431641 3.421875 C 13.318579 3.4779175 13.200103 3.5164101 13.089844 3.5800781 L 9.0761719 5.8964844 C 8.7701719 6.0724844 8.5801719 6.3989531 8.5761719 6.7519531 L 8.5175781 12.238281 L 6.75 11.189453 L 6.75 6.7851562 C 6.75 4.6491563 8.3075938 2.74225 10.433594 2.53125 C 10.632969 2.5115 10.83048 2.5060234 11.025391 2.5136719 z M 16.125 4.2558594 C 17.398584 4.263418 18.639844 4.8251563 19.417969 5.9101562 C 20.070858 6.819587 20.310242 7.9019929 20.146484 8.9472656 C 20.041416 8.8773528 19.948163 8.794144 19.837891 8.7304688 L 15.826172 6.4140625 C 15.520172 6.2380625 15.143937 6.2352031 14.835938 6.4082031 L 10.052734 9.1035156 L 10.076172 7.0488281 L 13.890625 4.8476562 C 14.584375 4.4471562 15.36085 4.2513242 16.125 4.2558594 z M 5.2832031 6.4726562 C 5.2752078 6.5985272 5.25 6.7203978 5.25 6.8476562 L 5.25 11.480469 C 5.25 11.833469 5.4362344 12.159844 5.7402344 12.339844 L 10.464844 15.136719 L 8.6738281 16.142578 L 4.859375 13.939453 C 3.009375 12.871453 2.1365781 10.567094 3.0175781 8.6210938 C 3.4795583 7.6006836 4.2963697 6.8535791 5.2832031 6.4726562 z M 15.326172 7.8574219 L 19.140625 10.060547 C 20.990625 11.128547 21.865375 13.432906 20.984375 15.378906 C 20.522287 16.399554 19.703941 17.146507 18.716797 17.527344 C 18.724764 17.401695 18.75 17.279375 18.75 17.152344 L 18.75 12.521484 C 18.75 12.167484 18.563766 11.840156 18.259766 11.660156 L 13.535156 8.8632812 L 15.326172 7.8574219 z M 12.025391 9.7109375 L 13.994141 10.878906 L 13.966797 13.167969 L 11.974609 14.287109 L 10.005859 13.121094 L 10.03125 10.832031 L 12.025391 9.7109375 z M 15.482422 11.761719 L 17.25 12.810547 L 17.25 17.214844 C 17.25 19.350844 15.692406 21.25775 13.566406 21.46875 C 12.449968 21.579344 11.392114 21.244395 10.568359 20.578125 C 10.681421 20.522082 10.799897 20.48359 10.910156 20.419922 L 14.923828 18.103516 C 15.229828 17.927516 15.419828 17.601047 15.423828 17.248047 L 15.482422 11.761719 z M 13.947266 14.896484 L 13.923828 16.951172 L 10.109375 19.152344 C 8.259375 20.220344 5.8270313 19.825844 4.5820312 18.089844 C 3.9291425 17.180413 3.6897576 16.098007 3.8535156 15.052734 C 3.9587303 15.122795 4.0516754 15.205719 4.1621094 15.269531 L 8.1738281 17.585938 C 8.4798281 17.761938 8.8560625 17.764797 9.1640625 17.591797 L 13.947266 14.896484 z"></path>
        </svg>
      )
    },
    { pathname: '1', title: '1', svg: defaultSvg },
    { pathname: '1', title: '2', svg: defaultSvg },
    { pathname: '1', title: '3', svg: defaultSvg },
    { pathname: '1', title: '4', svg: defaultSvg },
    { pathname: '1', title: '5', svg: defaultSvg },
    { pathname: '1', title: '6', svg: defaultSvg },
    { pathname: '1', title: '7', svg: defaultSvg },
    { pathname: '1', title: '8', svg: defaultSvg },
    { pathname: '1', title: '9', svg: defaultSvg },
    { pathname: '1', title: '0', svg: defaultSvg }
  ];

  return (
    <>
      <div
        className={
          'absolute z-30 flex h-full transform flex-col justify-between border-my-border bg-my-bg px-4 transition-transform duration-300 dark:border-my-darkborder dark:bg-my-darkbg1 md:relative md:translate-x-0 md:border-r-2 ' +
          `${navOpen ? 'translate-x-0' : '-translate-x-full'}`
        }
      >
        <div className="relative flex h-20 flex-shrink-0 flex-grow-0 items-center justify-center">
          <svg
            className="h-9 w-24"
            viewBox="0 0 97 36"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 13.389c0 7.394 5.994 13.388 13.389 13.388V0C5.994 0 0 5.994 0 13.389zm31.24 8.925c0-7.394-5.994-13.388-13.389-13.388v26.777c7.395 0 13.389-5.995 13.389-13.389zM77.35 2.168c0 .787-.695 1.424-1.553 1.424-.859 0-1.554-.637-1.554-1.424 0-.787.695-1.424 1.554-1.424.858 0 1.553.637 1.553 1.424zM45.174 7.743c-.307-2.194-2.337-3.28-4.715-3.28-2.296 0-4.387 1.127-4.387 3.382 0 1.558.902 2.583 2.357 2.994.555.16 1.184.331 1.877.52h.001l.87.238c.799.226 1.25.513 1.25 1.087 0 .717-.697 1.066-1.579 1.066-1.189 0-2.07-.574-2.296-1.66l-2.85.43c.431 2.521 2.297 3.628 5.085 3.628 2.522 0 4.49-1.291 4.49-3.587 0-1.886-1.128-2.747-3.486-3.342-.8-.205-1.332-.349-1.886-.513-.676-.205-1.066-.45-1.066-1.004s.759-.882 1.702-.84c1.004.04 1.68.614 1.783 1.393l2.85-.512zm3.836 3.342h7.77c.307-3.855-1.559-6.622-5.187-6.622-3.362 0-5.597 2.398-5.597 5.986 0 3.3 2.296 5.7 5.76 5.7 2.071 0 4.879-2.121 4.921-3.998h-2.788c-.43.922-1.271 1.394-2.296 1.394-1.497 0-2.378-.923-2.583-2.46zm2.583-4.203c1.578 0 2.173.738 2.357 2.05h-4.858c.266-1.23 1.004-2.05 2.5-2.05zM69.62 4.556c.922 0 1.813.235 2.51.973.964 1.004 1.066 2.152 1.066 3.567v6.745h-2.829V9.3c0-.8-.143-1.292-.533-1.722-.349-.39-.604-.543-1.137-.543s-.826.174-1.174.563c-.43.492-.513.984-.513 1.538v6.704h-2.829V9.3c0-.8-.143-1.292-.533-1.722-.348-.39-.633-.543-1.166-.543-.533 0-.796.174-1.145.563-.43.492-.513.984-.513 1.538v6.704h-2.808V4.77h2.46v1.188c.779-.922 1.699-1.403 2.929-1.403.922 0 1.842.235 2.54.973.204.225.389.45.512.676.779-1.066 1.81-1.65 3.163-1.65zm4.623.279V15.84h2.788V4.835h-2.788zM44.488 20.119v-3.755h2.808V30.82h-2.46v-1.036c-.348.777-1.763 1.343-2.993 1.343-3.054 0-5.105-2.521-5.105-5.842 0-3.383 2.071-5.843 5.249-5.843.984 0 1.804.246 2.5.676zm-4.797 5.167c0 1.865.8 3.362 2.603 3.362 1.866 0 2.542-1.353 2.542-3.362 0-2.01-.697-3.362-2.44-3.362-1.865 0-2.705 1.517-2.705 3.362zm11.451.779h7.77c.307-3.854-1.558-6.622-5.187-6.622-3.362 0-5.597 2.399-5.597 5.986 0 3.3 2.297 5.7 5.761 5.7 2.07 0 4.818-1.603 4.92-3.998h-2.788c-.43.922-1.27 1.394-2.296 1.394-1.496 0-2.378-.923-2.583-2.46zm2.583-4.203c1.579 0 2.173.738 2.358 2.05h-4.859c.267-1.23 1.005-2.05 2.501-2.05zm10.721-2.419c2.379 0 4.408 1.086 4.716 3.28l-2.85.513c-.102-.78-.779-1.353-1.784-1.394-.943-.041-1.701.287-1.701.84 0 .554.39.8 1.066 1.005.553.164 1.087.307 1.886.512 2.358.595 3.485 1.456 3.485 3.342 0 2.296-1.968 3.587-4.49 3.587-2.788 0-4.653-1.107-5.084-3.628l2.85-.43c.225 1.086 1.107 1.66 2.296 1.66.882 0 1.579-.349 1.579-1.066 0-.574-.452-.861-1.251-1.087l-.87-.237c-.694-.19-1.322-.36-1.877-.521-1.456-.41-2.358-1.435-2.358-2.993 0-2.256 2.091-3.383 4.388-3.383zm5.84.307v11.07h2.788V19.75h-2.788zm12.068.882v-.882h2.44v11.83c0 .553-.041 1.025-.164 1.496C84.097 35.106 81.8 36 79.36 36c-1.886 0-3.895-.94-4.736-2.375l2.584-1.25c.348.656 1.394 1 2.173 1 1.25 0 2.665-.606 2.624-1.837v-1.107c-.718.451-1.6.697-2.645.697-3.055 0-5.105-2.521-5.105-5.842 0-3.383 2.071-5.843 5.249-5.843 1.148 0 2.395.502 2.85 1.189zm-5.145 4.654c0 1.865.799 3.362 2.603 3.362 1.866 0 2.542-1.353 2.542-3.362 0-2.01-.697-3.362-2.44-3.362-1.865 0-2.706 1.517-2.706 3.362zm17.864-4.654c-1.066-1.046-2.398-1.271-3.71-1.189-1.005.061-2.132.43-2.85 1.291a1.172 1.172 0 01-.143.164V19.75h-2.46v11.07h2.808v-4.817c0-.758.02-1.62.123-2.111.123-.615.41-1.107.82-1.415.37-.266.8-.41 1.312-.43.759-.02 1.353.205 1.743.635.574.615.738 1.763.738 2.911v5.228h2.829v-5.35c0-1.723 0-3.65-1.21-4.839z"
            ></path>
          </svg>
        </div>
        <UserStatus></UserStatus>
        <div className="flex flex-shrink flex-grow flex-col items-center justify-between overflow-y-auto overflow-x-hidden border-b-[1px] border-my-border px-2 dark:border-my-darkborder">
          <ul className="space-y-2 py-2 font-medium" role="menu">
            {items.map((item) => (
              <li key={item.pathname}>
                <a
                  className={
                    'flex items-center p-2 ' +
                    `${
                      pathname === item.pathname
                        ? 'pointer-events-none cursor-default rounded-lg bg-my-bgHover text-base-0 dark:bg-my-darkbgHover dark:text-base-8'
                        : 'group rounded-lg hover:bg-my-bgHover dark:hover:bg-my-darkbgHover'
                    }`
                  }
                  href={item.pathname}
                >
                  {item.svg}
                  <span className="ms-3 whitespace-nowrap">{item.title}</span>
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
