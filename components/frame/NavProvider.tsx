'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import SwitchModeButton from '../theme/switchMode';
import { useHeader } from './HeaderProvider';
import Mask from './Mask';
import SettingButton from './settingsButton';

export default function NavProvider({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const curPath = usePathname();
  const router = useRouter();
  const { header, rbtn } = useHeader();

  const items = [
    {
      pathname: '/ner',
      title: '命名实体识别',
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M20 12H4m12-8h2a2 2 0 0 1 2 2v2M8 20H6a2 2 0 0 1-2-2v-2m16 0v2a2 2 0 0 1-2 2h-2M4 8V6a2 2 0 0 1 2-2h2"
          />
        </svg>
      )
    },
    {
      pathname: '/kgc',
      title: '知识图谱补全',
      svg: (
        <svg viewBox="0 0 1024 1024" className="h-5 w-5 fill-current p-0.5">
          <path d="M576 256h448v64H576zM0 704h448v64H0z m256 256h768v64H256zM0 0h768v64H0z"></path>
          <path d="M704 0h64v192h-64zM256 832h64v192h-64zM0 0h64v768H0z m960 256h64v768h-64z m-658.748 0l480.666 480.683-45.252 45.252L256 301.26z"></path>
        </svg>
      )
    },
    {
      pathname: '/kge',
      title: '知识图谱表征',
      svg: (
        <svg viewBox="0 0 1024 1024" className="h-5 w-5 fill-current p-[1px]">
          <path d="M1002.666667 1022.4H21.333333a21.333333 21.333333 0 0 1-21.333333-21.333333V22.954667a21.333333 21.333333 0 0 1 42.666667 0v956.778666h960a21.333333 21.333333 0 1 1 0 42.666667z"></path>
          <path d="M246.912 334.954667a21.354667 21.354667 0 0 1-8.256-41.024l124.8-52.266667a21.333333 21.333333 0 0 1 16.490667 39.36l-124.8 52.266667a21.674667 21.674667 0 0 1-8.234667 1.664zM606.101333 334.933333a21.205333 21.205333 0 0 1-13.482666-4.821333l-100.565334-82.261333a21.333333 21.333333 0 0 1 27.008-33.024l100.544 82.261333a21.333333 21.333333 0 0 1-13.504 37.845333zM732.074667 343.701333a21.354667 21.354667 0 0 1-13.952-37.482666l128.874666-111.125334a21.333333 21.333333 0 1 1 27.882667 32.298667l-128.874667 111.125333a21.248 21.248 0 0 1-13.930666 5.184zM246.890667 770.453333a21.312 21.312 0 0 1-7.061334-41.450666l124.8-43.882667a21.333333 21.333333 0 1 1 14.144 40.234667l-124.8 43.882666a20.629333 20.629333 0 0 1-7.082666 1.216zM682.773333 789.333333a21.141333 21.141333 0 0 1-10.304-2.666666l-177.237333-98.090667a21.333333 21.333333 0 0 1 20.650667-37.333333l177.237333 98.090666A21.333333 21.333333 0 0 1 682.773333 789.333333zM773.930667 782.912a21.376 21.376 0 0 1-17.685334-33.28l92.16-136.448a21.376 21.376 0 0 1 35.392 23.872l-92.16 136.448a21.248 21.248 0 0 1-17.706666 9.408z"></path>
          <path d="M177.301333 432.32a91.776 91.776 0 0 1-91.669333-91.669333c0-50.538667 41.130667-91.669333 91.669333-91.669334s91.669333 41.130667 91.669334 91.669334a91.776 91.776 0 0 1-91.669334 91.669333z m0-140.672c-27.029333 0-49.002667 21.973333-49.002666 49.002667s21.973333 49.002667 49.002666 49.002666 49.002667-21.994667 49.002667-49.002666-21.973333-49.002667-49.002667-49.002667zM435.221333 322.986667a91.733333 91.733333 0 0 1-91.648-91.648c0-50.538667 41.109333-91.648 91.648-91.648s91.648 41.109333 91.648 91.648a91.733333 91.733333 0 0 1-91.648 91.648z m0-140.629334c-27.008 0-48.981333 21.973333-48.981333 48.981334s21.973333 48.981333 48.981333 48.981333 48.981333-21.973333 48.981334-48.981333-21.973333-48.981333-48.981334-48.981334zM668.629333 453.930667c-50.538667 0-91.669333-41.130667-91.669333-91.669334s41.130667-91.669333 91.669333-91.669333 91.669333 41.130667 91.669334 91.669333-41.130667 91.669333-91.669334 91.669334z m0-140.672c-27.029333 0-49.002667 21.973333-49.002666 49.002666s21.973333 49.002667 49.002666 49.002667 49.002667-21.973333 49.002667-49.002667-21.994667-49.002667-49.002667-49.002666zM910.101333 252.672c-50.56 0-91.690667-41.130667-91.690666-91.669333s41.130667-91.669333 91.690666-91.669334c50.538667 0 91.669333 41.130667 91.669334 91.669334s-41.130667 91.669333-91.669334 91.669333z m0-140.672c-27.029333 0-49.024 21.973333-49.024 49.002667s21.994667 49.002667 49.024 49.002666 49.002667-21.973333 49.002667-49.002666-21.973333-49.002667-49.002667-49.002667zM889.109333 646.442667a91.733333 91.733333 0 0 1-91.648-91.648c0-50.538667 41.109333-91.648 91.648-91.648s91.648 41.109333 91.648 91.648a91.733333 91.733333 0 0 1-91.648 91.648z m0-140.629334c-27.008 0-48.981333 21.973333-48.981333 48.981334s21.973333 48.981333 48.981333 48.981333 48.981333-21.973333 48.981334-48.981333-21.994667-48.981333-48.981334-48.981334zM732.117333 909.717333a91.754667 91.754667 0 0 1-91.669333-91.626666 91.776 91.776 0 0 1 91.669333-91.669334 91.754667 91.754667 0 0 1 91.626667 91.669334 91.733333 91.733333 0 0 1-91.626667 91.626666z m0-140.629333a49.045333 49.045333 0 0 0-49.002666 49.002667 49.002667 49.002667 0 1 0 49.002666-49.002667zM435.221333 761.557333c-50.538667 0-91.648-41.109333-91.648-91.648s41.109333-91.669333 91.648-91.669333 91.648 41.130667 91.648 91.669333-41.109333 91.648-91.648 91.648z m0-140.650666a49.045333 49.045333 0 0 0-48.981333 49.002666c0 27.008 21.973333 48.981333 48.981333 48.981334s48.981333-21.973333 48.981334-48.981334a49.066667 49.066667 0 0 0-48.981334-49.002666zM177.301333 867.242667c-50.538667 0-91.669333-41.130667-91.669333-91.669334s41.130667-91.669333 91.669333-91.669333 91.669333 41.130667 91.669334 91.669333-41.130667 91.669333-91.669334 91.669334z m0-140.650667c-27.029333 0-49.002667 21.973333-49.002666 49.002667s21.973333 49.002667 49.002666 49.002666 49.002667-21.973333 49.002667-49.002666-21.973333-49.002667-49.002667-49.002667z"></path>
        </svg>
      )
    },
    {
      pathname: '/kb',
      title: '知识库管理',
      svg: (
        <svg viewBox="0 0 1024 1024" className="h-5 w-5 fill-current">
          <path d="M912.9 129.3H769.2c-24.9 0-45 20.1-45 45v677.8c0 24.9 20.1 45 45 45h143.7c24.9 0 45-20.1 45-45V174.3c0-24.8-20.1-45-45-45z m-27 72v466.9h-89.7V201.3h89.7z m-89.7 623.8v-84.9h89.7v84.9h-89.7zM636.8 129.3H493.1c-24.9 0-45 20.1-45 45v677.8c0 24.9 20.1 45 45 45h143.7c24.9 0 45-20.1 45-45V174.3c0-24.8-20.2-45-45-45z m-27 72v466.9h-89.7V201.3h89.7z m-89.7 623.8v-84.9h89.7v84.9h-89.7zM409.3 162.7l-140-32.5c-3.4-0.8-6.8-1.2-10.2-1.2-20.5 0-39 14.1-43.8 34.8L65.6 808.9c-5.6 24.2 9.5 48.4 33.7 54l140 32.5c3.4 0.8 6.8 1.2 10.2 1.2 20.5 0 39-14.1 43.8-34.8l116-499.9c0.3-1 0.6-2.1 0.9-3.2 0.2-1.1 0.4-2.1 0.6-3.2L443 216.6c5.6-24.1-9.5-48.3-33.7-53.9z m-130 43.7l87.4 20.3-18.7 80.6-87.4-20.3 18.7-80.6z m-50 612.8l-87.4-20.3 102.5-441.7 87.4 20.3-102.5 441.7z"></path>
        </svg>
      )
    },
    {
      pathname: '/qa',
      title: '知识图问答',
      svg: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 1024 1024">
          <path d="M863.993856 863.983646a127.997948 127.997948 0 0 0 0-255.994895 127.997948 127.997948 0 0 0-63.999974 17.919992l-90.877963-89.598963a157.436935 157.436935 0 0 0-5.119998-186.235924l47.999981-72.31897a127.997948 127.997948 0 1 0-50.55998-39.679984l-46.718981 70.399971a155.516936 155.516936 0 0 0-176.635927 11.519996l-132.477946-85.759965a155.516936 155.516936 0 0 0-40.319983-155.515936 159.996934 159.996934 0 1 0 0 226.554907 161.916934 161.916934 0 0 0 10.879995-13.439995l120.317951 79.999967a150.396938 150.396938 0 0 0-14.079994 117.116952l-102.397958 52.479979a159.356935 159.356935 0 1 0 31.999987 98.55696 158.076935 158.076935 0 0 0-5.759998-40.958984l101.757958-52.478978a159.356935 159.356935 0 0 0 85.758965 56.319977l-39.039984 165.115932H480.000013a127.997948 127.997948 0 1 0 74.879969 24.31999l46.717981-186.876923a158.716935 158.716935 0 0 0 63.999974-24.31999l90.237963 90.238963a127.997948 127.997948 0 0 0-17.919993 63.998973 127.997948 127.997948 0 0 0 126.077949 128.636948z m-604.149753-604.148753a95.997961 95.997961 0 1 1 28.159989-67.837972 95.997961 95.997961 0 0 1-28.159989 67.837972z m-67.837972 476.151805a95.997961 95.997961 0 1 1 95.997961-95.99896 95.997961 95.997961 0 0 1-95.997961 95.99896zM480.000013 959.982606a63.998974 63.998974 0 1 1 63.997974-63.999973 63.998974 63.998974 0 0 1-63.997974 63.999973z m447.990816-223.995908a63.998974 63.998974 0 1 1-63.997973-63.999974 63.998974 63.998974 0 0 1 63.997973 63.999974zM799.994882 95.997961a63.998974 63.998974 0 1 1-63.999974 63.999973 63.998974 63.998974 0 0 1 63.999974-63.999973zM480.000013 447.991816a95.997961 95.997961 0 1 1 95.997961 95.997961A95.997961 95.997961 0 0 1 480.000013 447.991816z" />
        </svg>
      )
    },
    {
      pathname: '/rag',
      title: '知识库问答',
      svg: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 1260 1024">
          <path d="M1177.738445 663.954058a51.073389 51.073389 0 0 1-36.262107-14.811283l-123.086867-123.086868a51.073389 51.073389 0 0 0-36.262107-14.811282H462.710998A153.220167 153.220167 0 0 1 309.49083 357.513723V153.220167a153.220167 153.220167 0 0 1 153.220168-153.220167h612.880668a153.220167 153.220167 0 0 1 153.220168 153.220167v204.293556a51.073389 51.073389 0 0 1-102.146778 0V153.220167a51.073389 51.073389 0 0 0-51.07339-51.073389H462.710998a51.073389 51.073389 0 0 0-51.073389 51.073389v204.293556a51.073389 51.073389 0 0 0 51.073389 51.07339h519.416366a153.220167 153.220167 0 0 1 108.275585 44.944582l123.086868 123.086868A51.073389 51.073389 0 0 1 1177.738445 663.954058zM105.197274 715.027447v-204.293556a51.073389 51.073389 0 0 1 51.073389-51.073389 51.073389 51.073389 0 0 0 0-102.146779 153.220167 153.220167 0 0 0-153.220167 153.220168v204.293556a51.073389 51.073389 0 0 0 102.146778 0z m-14.811283 291.629052l123.086868-123.086868a51.073389 51.073389 0 0 1 36.262106-15.322017H769.151332a153.220167 153.220167 0 0 0 153.220167-153.220167v-51.073389a51.073389 51.073389 0 0 0-102.146778 0v51.073389a51.073389 51.073389 0 0 1-51.073389 51.073389H249.734965a153.220167 153.220167 0 0 0-108.275585 44.944582L17.861779 934.132286A51.073389 51.073389 0 1 0 89.875257 1006.145765z"></path>
        </svg>
      )
    },
    {
      pathname: '/chat',
      title: '开放对话',
      svg: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M 11.134766 1.0175781 C 10.87173 1.0049844 10.606766 1.0088281 10.337891 1.0332031 C 8.1135321 1.2338971 6.3362243 2.7940749 5.609375 4.8203125 C 3.8970488 5.1768339 2.4372723 6.3048522 1.671875 7.9570312 C 0.73398779 9.9840533 1.1972842 12.30076 2.5878906 13.943359 C 2.0402591 15.605222 2.2856216 17.434472 3.3320312 18.921875 C 4.6182099 20.747762 6.8565685 21.504693 8.9746094 21.121094 C 10.139659 22.427613 11.84756 23.130452 13.662109 22.966797 C 15.886521 22.766098 17.663809 21.205995 18.390625 19.179688 C 20.102972 18.823145 21.563838 17.695991 22.330078 16.042969 C 23.268167 14.016272 22.805368 11.697142 21.414062 10.054688 C 21.960697 8.3934373 21.713894 6.5648387 20.667969 5.078125 C 19.38179 3.2522378 17.143432 2.4953068 15.025391 2.8789062 C 14.032975 1.7660011 12.646869 1.0899755 11.134766 1.0175781 z M 11.025391 2.5136719 C 11.921917 2.5488523 12.754993 2.8745885 13.431641 3.421875 C 13.318579 3.4779175 13.200103 3.5164101 13.089844 3.5800781 L 9.0761719 5.8964844 C 8.7701719 6.0724844 8.5801719 6.3989531 8.5761719 6.7519531 L 8.5175781 12.238281 L 6.75 11.189453 L 6.75 6.7851562 C 6.75 4.6491563 8.3075938 2.74225 10.433594 2.53125 C 10.632969 2.5115 10.83048 2.5060234 11.025391 2.5136719 z M 16.125 4.2558594 C 17.398584 4.263418 18.639844 4.8251563 19.417969 5.9101562 C 20.070858 6.819587 20.310242 7.9019929 20.146484 8.9472656 C 20.041416 8.8773528 19.948163 8.794144 19.837891 8.7304688 L 15.826172 6.4140625 C 15.520172 6.2380625 15.143937 6.2352031 14.835938 6.4082031 L 10.052734 9.1035156 L 10.076172 7.0488281 L 13.890625 4.8476562 C 14.584375 4.4471562 15.36085 4.2513242 16.125 4.2558594 z M 5.2832031 6.4726562 C 5.2752078 6.5985272 5.25 6.7203978 5.25 6.8476562 L 5.25 11.480469 C 5.25 11.833469 5.4362344 12.159844 5.7402344 12.339844 L 10.464844 15.136719 L 8.6738281 16.142578 L 4.859375 13.939453 C 3.009375 12.871453 2.1365781 10.567094 3.0175781 8.6210938 C 3.4795583 7.6006836 4.2963697 6.8535791 5.2832031 6.4726562 z M 15.326172 7.8574219 L 19.140625 10.060547 C 20.990625 11.128547 21.865375 13.432906 20.984375 15.378906 C 20.522287 16.399554 19.703941 17.146507 18.716797 17.527344 C 18.724764 17.401695 18.75 17.279375 18.75 17.152344 L 18.75 12.521484 C 18.75 12.167484 18.563766 11.840156 18.259766 11.660156 L 13.535156 8.8632812 L 15.326172 7.8574219 z M 12.025391 9.7109375 L 13.994141 10.878906 L 13.966797 13.167969 L 11.974609 14.287109 L 10.005859 13.121094 L 10.03125 10.832031 L 12.025391 9.7109375 z M 15.482422 11.761719 L 17.25 12.810547 L 17.25 17.214844 C 17.25 19.350844 15.692406 21.25775 13.566406 21.46875 C 12.449968 21.579344 11.392114 21.244395 10.568359 20.578125 C 10.681421 20.522082 10.799897 20.48359 10.910156 20.419922 L 14.923828 18.103516 C 15.229828 17.927516 15.419828 17.601047 15.423828 17.248047 L 15.482422 11.761719 z M 13.947266 14.896484 L 13.923828 16.951172 L 10.109375 19.152344 C 8.259375 20.220344 5.8270313 19.825844 4.5820312 18.089844 C 3.9291425 17.180413 3.6897576 16.098007 3.8535156 15.052734 C 3.9587303 15.122795 4.0516754 15.205719 4.1621094 15.269531 L 8.1738281 17.585938 C 8.4798281 17.761938 8.8560625 17.764797 9.1640625 17.591797 L 13.947266 14.896484 z"></path>
        </svg>
      )
    },
    {
      pathname: '/logs',
      title: '日志监控',
      svg: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 1024 1024">
          <path d="M897.28 170.666667h-750.933333c-28.16 0-51.2 23.04-51.2 51.2v665.6c0 28.16 23.04 51.2 51.2 51.2h750.933333c28.16 0 51.2-23.04 51.2-51.2V221.866667c0-28.16-22.613333-51.2-51.2-51.2z m-17.066667 699.733333h-716.8V238.933333h716.8v631.466667z"></path>
          <path d="M744.96 699.733333H333.226667c-18.346667 0-32.853333-14.933333-32.853334-32.853333v-2.133333c0-18.346667 14.933333-32.853333 32.853334-32.853334h411.733333c18.346667 0 32.853333 14.933333 32.853333 32.853334v2.133333c0 17.92-14.506667 32.853333-32.853333 32.853333zM743.68 546.133333h-221.866667c-18.773333 0-34.133333-15.36-34.133333-34.133333s15.36-34.133333 34.133333-34.133333h221.866667c18.773333 0 34.133333 15.36 34.133333 34.133333s-14.933333 34.133333-34.133333 34.133333zM718.08 307.2c-18.773333 0-34.133333-15.36-34.133333-34.133333V119.466667c0-18.773333 15.36-34.133333 34.133333-34.133334s34.133333 15.36 34.133333 34.133334v153.6c0 18.773333-14.933333 34.133333-34.133333 34.133333zM325.546667 307.2c-18.773333 0-34.133333-15.36-34.133334-34.133333V119.466667c0-18.773333 15.36-34.133333 34.133334-34.133334s34.133333 15.36 34.133333 34.133334v153.6c0 18.773333-14.933333 34.133333-34.133333 34.133333z"></path>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* 左边导航栏 */}
      <div
        className={
          'bg0 border0 absolute z-50 flex h-full transform flex-col justify-between border-r-2 px-4 transition-transform duration-300 sm:relative sm:z-0 sm:translate-x-0 ' +
          `${navOpen ? 'translate-x-0' : '-translate-x-full'}`
        }
      >
        <div
          onClick={() => {
            router.push('/welcome');
          }}
          className="border0 relative flex shrink-0 grow-0 cursor-pointer flex-col items-center justify-center border-b pt-6 pb-2"
        >
          <svg className="h-10" viewBox="0 0 1024 1024">
            <path
              d="M850.34568 1023.999787a54.186509 54.186509 0 0 1-36.266561-15.573288L669.226208 874.666889a46.079866 46.079866 0 0 0-27.306587-10.879968h-149.332898a36.906559 36.906559 0 0 1-36.906559-29.653247 35.626563 35.626563 0 0 1 34.773232-42.666542h194.132767l138.879595 129.279622V789.333804h127.999627V380.161665h-115.839662a37.119892 37.119892 0 0 1-37.119892-29.653247 35.626563 35.626563 0 0 1 34.986565-42.666543h123.519639a65.27981 65.27981 0 0 1 63.999814 65.493143v422.185435a65.066477 65.066477 0 0 1-63.999814 65.493142H895.99888v111.573008a49.706522 49.706522 0 0 1-27.51992 47.786528 42.666542 42.666542 0 0 1-17.279949 3.626656z"
              fill="#0077F0"
              opacity=".5"
            />
            <path
              d="M789.332524 64.002587v486.611914H399.786994a63.999813 63.999813 0 0 0-42.666542 16.853284l-153.38622 140.159591v-93.013062a63.999813 63.999813 0 0 0-63.999813-63.999813H64.001307V64.002587h725.331217m32.21324-63.999814h-789.331031A31.786574 31.786574 0 0 0 0.001493 31.789347v551.038393a31.786574 31.786574 0 0 0 31.786574 31.786574h107.946352v166.399515a31.786574 31.786574 0 0 0 31.999907 31.786574 31.359909 31.359909 0 0 0 21.333271-8.319976l206.719397-189.866113h421.75877A31.786574 31.786574 0 0 0 853.332338 582.82774V31.789347A31.786574 31.786574 0 0 0 821.545764 0.002773z"
              fill="#0077F0"
            />
          </svg>
          <div className="text-xl font-semibold italic">NextQA</div>
        </div>
        <div className="border0 flex shrink grow flex-col items-center justify-center overflow-x-hidden overflow-y-auto border-b px-2">
          <ul className="space-y-2 font-medium" role="menu">
            {items.map((item) => (
              <li className="h-10" key={item.pathname}>
                <a
                  className={
                    'flex items-center space-x-3 rounded-lg px-3 py-2 ' +
                    `${
                      curPath === item.pathname
                        ? 'bg-my-primary dark:bg-my-dark-primary pointer-events-none cursor-default text-white'
                        : 'hover:bg-my-bg-hover dark:hover:bg-my-dark-bg-hover text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white'
                    }`
                  }
                  href={item.pathname}
                >
                  {item.svg}
                  <span className="whitespace-nowrap">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 grow-0 flex-row justify-between pt-3 pb-5">
          <a
            href="https://github.com/shijiahao314/next-qa"
            className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <svg className="h-6 w-6" viewBox="0 0 98 96">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                fill="currentColor"
              />
            </svg>
          </a>
          <SwitchModeButton></SwitchModeButton>
          <SettingButton></SettingButton>
        </div>
      </div>

      {/* 上方导航栏 */}
      <div className="bg1 border0 z-10 flex w-full flex-row justify-between border-b px-5 py-4 sm:hidden">
        <button
          className="border0 bg2 h-12 w-12 place-content-center items-center rounded-lg border p-2 text-base font-semibold sm:hidden"
          onClick={() => {
            setNavOpen(true);
          }}
        >
          <svg viewBox="0 0 1024 1024">
            <path
              d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
              fill="#999"
            />
          </svg>
        </button>
        {!header ? (
          <div className="space-1 relative flex h-12 shrink-0 grow-0 cursor-pointer flex-row items-center justify-center">
            <svg className="w-12 animate-spin p-1" viewBox="0 0 24 24">
              <path
                fill="#0077F0"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity="0.5"
              />
              <path fill="#0077F0" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"></path>
            </svg>
          </div>
        ) : (
          <>{header}</>
        )}
        {rbtn === null ? <div className="h-12 w-12"></div> : <>{rbtn}</>}
      </div>

      {/* mask */}
      <Mask isOpen={navOpen} onClose={() => setNavOpen(false)}></Mask>

      {children}
    </>
  );
}
