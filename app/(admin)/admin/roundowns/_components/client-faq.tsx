"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle, ScrollText, ShieldQuestion } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaqList } from "./faq-list";
import { getDetailFaqs } from "@/actions/get-detail-faq";
import { Textarea } from "@/components/ui/textarea";
import { FaqsProps } from "./client";
import { useCookies } from "next-client-cookies";
import { useModal } from "@/hooks/use-modal";

export const ClientFaq = ({
  initialData,
  cabang,
}: {
  initialData: FaqsProps[];
  cabang: string;
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<FaqsProps[]>([]);
  const router = useRouter();
  const [input, setInput] = useState<{
    question: string;
    answer: string;
  }>({
    question: "",
    answer: "",
  });
  const [editId, setEditId] = useState("");
  const cookies = useCookies();
  const { onOpen } = useModal();
  const updated = cookies.get("updated");

  const toggleCreating = () => {
    setIsCreating((e) => !e);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      question: input.question,
      answer: input.answer,
      cabang: cabang,
    };
    if (isEditing) {
      try {
        await axios.patch(`/api/admin/faqs/${editId}`, body);
        toast.success("FAQ updated.");
        handleClose();
        cookies.set("updated", "updated");
        router.refresh();
      } catch {
        toast.error("Something went wrong.");
      }
    } else {
      try {
        await axios.post(`/api/admin/faqs`, body);
        toast.success("FAQ created.");
        handleClose();
        cookies.set("updated", "updated");
        router.refresh();
      } catch {
        toast.error("Something went wrong.");
      }
    }
  };

  const getDetail = async (faqId: string) => {
    try {
      const res = await getDetailFaqs(faqId);
      if (res) {
        setIsEditing(true);
        setIsCreating(true);
        setInput({
          question: res.question,
          answer: res.answer,
        });
        setEditId(res.id);
      }
    } catch (error) {
      console.log("ERROR_GET_DETAIL", error);
    }
  };

  const handleClose = () => {
    setInput({
      question: "",
      answer: "",
    });
    setIsCreating(false);
    setIsEditing(false);
    setEditId("");
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/admin/faqs/reorder`, {
        list: updateData,
      });
      toast.success("Roundown reordered.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    handleClose();
  }, [updated]);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  return (
    <div className="mt-6 border rounded-md p-4 relative w-full">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 rounded-md top-0 right-0 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="font-medium flex md:items-center md:justify-between mb-5 flex-col md:flex-row gap-3">
        <h3 className="text-lg font-semibold flex items-center">
          <div className="h-10 w-10 border rounded-full flex justify-center items-center border-black mr-2">
            <ShieldQuestion className="w-5 h-5" />
          </div>
          List FAQs
        </h3>
        {isCreating ? (
          <Button variant={"outline"} onClick={handleClose}>
            Cancel
          </Button>
        ) : (
          <Button variant={"outline"} onClick={toggleCreating}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah FAQ
          </Button>
        )}
      </div>
      {isCreating ? (
        <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
          <div>
            <Label>Question</Label>
            <Textarea
              value={input.question}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, question: e.target.value }))
              }
            />
          </div>
          <div className="flex w-full gap-4 items-start">
            <div className="w-full">
              <Label>Answer</Label>
              <Textarea
                value={input.answer}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, answer: e.target.value }))
                }
              />
            </div>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-3">
              <Button type="submit" className="mt-2">
                Update
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                className="mt-2"
                onClick={() => onOpen("delete-faq", editId)}
              >
                Hapus
              </Button>
            </div>
          ) : (
            <div>
              <Button type="submit" className="mt-2">
                Simpan
              </Button>
            </div>
          )}
        </form>
      ) : (
        <div className="mt-2">
          <div
            className={cn(
              "text-sm",
              !initialData.length && "text-slate-500 italic"
            )}
          >
            {!initialData.length && "FAQ tidak ditemukan"}
            <FaqList
              onEdit={(e) => getDetail(e)}
              onReorder={onReorder}
              items={data}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            drag and drop Acara to reorder FAQ
          </p>
        </div>
      )}
    </div>
  );
};
