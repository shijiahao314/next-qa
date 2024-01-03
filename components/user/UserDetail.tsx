import { UserInfo } from '@/api/model/user';

interface ModalProps {
  userInfo: UserInfo;
  onClose: () => void;
}

export default function UserDetail({ userInfo, onClose }: ModalProps) {
  return (
    <div className="absolute z-10 block h-full w-full items-center justify-center bg-my-bg/50 dark:bg-my-darkbg0/50">
      <div className="w-1/2 rounded-md border-2 bg-my-bg dark:bg-my-darkbg2">
        <div className="flex h-full w-full flex-col">
          <div className="w-full border-b px-6 py-2 text-lg font-semibold">用户信息</div>
          <div className="grid h-full w-full grid-cols-2 space-y-2 px-6 py-4 text-my-text0 dark:text-my-darktext0">
            <label className="flex items-center">用户ID</label>
            <input
              className="rounded-md bg-my-bg p-2 dark:bg-my-darkbg3"
              placeholder={userInfo.userid}
              disabled
            ></input>
            <label className="flex items-center">用户名称</label>
            <input
              className="rounded-md bg-my-bg p-2 dark:bg-my-darkbg3"
              placeholder={userInfo.username}
              disabled
            ></input>
            <label className="flex items-center">用户角色</label>
            <input
              className="rounded-md bg-my-bg p-2 dark:bg-my-darkbg3"
              placeholder={userInfo.role}
              disabled
            ></input>
          </div>
          <div className="flex w-full flex-row justify-end space-x-2 border-t px-6 py-4">
            <button
              className="h-[35px] w-[70px] rounded-md bg-my-tertiary text-white hover:bg-my-tertiaryHover
                dark:bg-my-darkTertiary dark:hover:bg-my-darkTertiaryHover"
              onClick={onClose}
            >
              返回
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
