import UserTable from '../../components/user/UserTable';
import Modal from '@/components/modal';
import { GetUser } from '../api/users';
import { useEffect, useState } from 'react';

export default async function UsersPage() {
  // const [showModal, setShowModal] = useState(false);

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  // useEffect(() => {
  //   console.log('render');
  // });

  const handleDelte = (userid: string) => {
    console.log('delete userid=' + userid);
  };

  return (
    <div className="flex h-screen w-full flex-col px-10 py-10">
      {/* {showModal && <Modal></Modal>}
      <div className="flex w-full flex-row">
        <button
          className="h-[35px] w-[70px] rounded-md bg-my-primary text-base text-my-darktext0 hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
          onClick={toggleModal}
        >
          新增
        </button>
      </div> */}
      <div className="flex py-5">
        <UserTable></UserTable>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <Modal></Modal>
      </div>
    </div>
  );
}
