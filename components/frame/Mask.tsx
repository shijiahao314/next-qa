export default function Mask({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={
        `fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ` +
        `${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`
      }
      onClick={() => {
        onClose();
      }}
    ></div>
  );
}
