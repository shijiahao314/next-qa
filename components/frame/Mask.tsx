export default function Mask({ status, onClose }: { status: boolean; onClose: () => void }) {
  return (
    <div
      className={
        `fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 sm:hidden ` +
        `${status ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`
      }
      onClick={() => {
        onClose();
      }}
    ></div>
  );
}
