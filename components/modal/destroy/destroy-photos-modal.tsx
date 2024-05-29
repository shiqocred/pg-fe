"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal";
import { Modal } from "../modal";
import { Button } from "@/components/ui/button";
import { destroyPhotos } from "@/actions/destroy/destroy-photos";
import { useCookies } from "next-client-cookies";

export const DestroyPhotosModal = () => {
  const { isOpen, onClose, type, datas } = useModal();
  const router = useRouter();
  const cookies = useCookies();

  const isModalOpen = isOpen && type === "delete-photos";

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await destroyPhotos(datas);
      toast.success("Photos berhasil dihapus");
      cookies.set("deleted", "deleted");
      onClose();
      router.refresh();
    } catch (error) {
      console.log("[ERROR_DELETE_PHOTOS:", error);
      toast.error("Photos gagal dihapus");
    }
  };

  return (
    <Modal
      title="Hapus Photos"
      description="Tindakan bersifat permanen"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <form onSubmit={onDelete} className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin menghapus foto-foto ini?</p>
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
