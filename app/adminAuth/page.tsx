"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function AdminAuth() {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (password == "12345") {
      localStorage.setItem("adminAuth", "true");
      location.replace("/admin");
    } else {
      return toast({
        title: "Invalid password",
        description: "Try one more time or contact Dimasik the programmer",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-screen h-[70vh] flex items-center justify-center">
      <div className="w-[300px] h-[300px] flex items-center justify-center flex-col gap-5 trans">
        <h1>Provide a password</h1>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black border-dotted p-2 rounded-xl"
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
