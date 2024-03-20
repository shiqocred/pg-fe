"use client";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {});
      toast.success("Logout success");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Button type="button" onClick={onLogout}>
      Logout
    </Button>
  );
};
