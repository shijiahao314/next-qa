import Loading from '../loading';
import { Suspense } from 'react';
import UserTable from './userTable';

export default function UsersPage() {
  return (
    <div className="flex h-screen w-full flex-col px-10 py-10">
      <div className="flex w-full flex-row">
        <button className="h-[35px] w-[70px] rounded-md bg-my-primary text-base text-my-darktext0 hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover">
          新增
        </button>
      </div>
      <Suspense fallback={<Loading></Loading>}>
        <div className="flex py-5">
          <UserTable></UserTable>
        </div>
      </Suspense>
    </div>
  );
}
