export default function Modal() {
  return (
    <div className=" flex h-4/5 w-2/3 flex-col items-center justify-center rounded-md border-2">
      <div className="w-full border-b px-6 py-2 text-lg font-semibold">新增用户</div>
      <div className="h-full w-full px-6 py-4"></div>
      <div className="flex w-full flex-row justify-end space-x-2 border-t px-6 py-4">
        <button className="h-[35px] w-[70px] rounded-md bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover">
          确认
        </button>
        <button className="h-[35px] w-[70px] rounded-md bg-my-tertiary text-white hover:bg-my-tertiaryHover dark:bg-my-darkTertiary dark:hover:bg-my-darkTertiaryHover">
          取消
        </button>
      </div>
    </div>
  );
}
