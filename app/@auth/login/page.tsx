import Modal from "@/app/components/modal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <Modal
      isOpen={false}
      onClose={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      <span onClick={() => router.back()}>Close modal</span>
      <h1>Login</h1>
    </Modal>
  );
}
