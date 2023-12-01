import Modal from "@/app/components/modal";

export default function SignUpPage() {
  return (
    <Modal
      isOpen={false}
      onClose={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      <h1>signUp</h1>
    </Modal>
  );
}
