"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal";
import { Modal } from "../modal";
import { Button } from "@/components/ui/button";
import { destroySupervisor } from "@/actions/destroy/destroy-supervisor";

export const DestroySupervisorModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "delete-supervisor";

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await destroySupervisor(data);
      toast.success("Video berhasil dihapus");
      onClose();
      router.refresh();
    } catch (error) {
      console.log("[ERROR_DELETE_VIDEO:", error);
      toast.error("Video gagal dihapus");
    }
  };

  return (
    <Modal
      title="Hapus Supervisor"
      description="Tindakan bersifat permanen"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <form onSubmit={onDelete} className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin menghapus supervisor ini?</p>
        <div className="flex w-full gap-2">
          <Button
            type="button"
            className="w-full bg-transparent hover:bg-transparent border border-black/30 hover:border-black text-black"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button variant={"destructive"} type="submit">
            Hapus
          </Button>
        </div>
      </form>
    </Modal>
  );
};
