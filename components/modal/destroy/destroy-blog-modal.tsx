"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal";
import { Modal } from "../modal";
import { Button } from "@/components/ui/button";
import { destroyBlog } from "@/actions/destroy/destroy-blog";

export const DestroyBlogModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "delete-blog";

  const onDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await destroyBlog(data);
      toast.success("Blog berhasil dihapus");
      onClose();
      router.refresh();
    } catch (error) {
      console.log("[ERROR_DELETE_BLOG:", error);
      toast.error("Blog gagal dihapus");
    }
  };

  return (
    <Modal
      title="Hapus Blog"
      description="Tindakan bersifat permanen"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <form onSubmit={onDelete} className="w-full flex flex-col gap-4">
        <p>Apakah anda yakin ingin menghapus blog ini?</p>
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
