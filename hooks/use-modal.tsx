import { StoreApi, UseBoundStore, create } from "zustand";

export type ModalType =
  | "delete-category"
  | "delete-blog"
  | "delete-video"
  | "delete-poster"
  | "delete-faq"
  | "delete-roundown"
  | "delete-sponsorship"
  | "delete-supervisor"
  | "delete-photos";

interface UseModalProps {
  data: string;
  datas: string[];
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: string, datas?: string[]) => void;
  onClose: () => void;
}

export const useModal: UseBoundStore<StoreApi<UseModalProps>> =
  create<UseModalProps>((set) => ({
    data: "",
    datas: [],
    type: null,
    isOpen: false,
    onOpen: (type, data, datas) => set({ isOpen: true, type, data, datas }),
    onClose: () => set({ isOpen: false, type: null }),
  }));
