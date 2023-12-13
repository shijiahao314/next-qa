'use client';

import { useState } from 'react';

export default function CRUDHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button
        className="h-[35px] w-[70px] rounded-md bg-my-primary text-base text-my-darktext0 hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
        onClick={openModal}
      ></button>
    </div>
  );
}
