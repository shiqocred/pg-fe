"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal";
import { Modal } from "../modal";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import axios from "axios";

export const DestroyRoundownModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const cookies = useCookies();

  const isModalOpen = isOpen && type === "delete-roundown";

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/admin/roundowns/${data}`);
      toast.success("Acara berhasil dihapus");
      cookies.set("updated", "updated");
      onClose();
      router.refresh();
    } catch (error) {
      console.log("[ERROR_DELETE_ACARA:", error);
      toast.error("Acara gagal dihapus");
    }
  };

  return (
    <Modal
      title="Hapus Acara"
      description="Tindakan bersifat permanen"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <form onSubmit={onDelete} className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin menghapus acara ini?</p>
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
