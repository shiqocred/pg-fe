"use client";

import { DestroyBlogModal } from "@/components/modal/destroy/destroy-blog-modal";
import { DestroyCaegoryModal } from "@/components/modal/destroy/destroy-category-modal";
import { DestroyFaqModal } from "@/components/modal/destroy/destroy-faq-modal";
import { DestroyPhotosModal } from "@/components/modal/destroy/destroy-photos-modal";
import { DestroyPosterModal } from "@/components/modal/destroy/destroy-poster-modal";
import { DestroyRoundownModal } from "@/components/modal/destroy/destroy-roundown-modal";
import { DestroySponsorshipModal } from "@/components/modal/destroy/destroy-sponsorship-modal";
import { DestroySupervisorModal } from "@/components/modal/destroy/destroy-supervisor-modal";
import { DestroyVideoModal } from "@/components/modal/destroy/destroy-video-modal";

const ModalProvider = () => {
  return (
    <>
      <DestroyCaegoryModal />
      <DestroyBlogModal />
      <DestroyVideoModal />
      <DestroyPosterModal />
      <DestroyFaqModal />
      <DestroyRoundownModal />
      <DestroySponsorshipModal />
      <DestroySupervisorModal />
      <DestroyPhotosModal />
    </>
  );
};

export default ModalProvider;
