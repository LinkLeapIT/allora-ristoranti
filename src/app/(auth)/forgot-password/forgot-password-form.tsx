"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Email Sent",
        description: `We've sent an email to ${email} with instructions to reset your password.`,
        variant: "success",
      });
      setEmail("");
    } catch (error: any) {
      console.error("Password Reset Error:", error.message);
      toast({
        title: "Error",
        description:
          error.message || "Failed to send password reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="email"
        value={email}
        placeholder="Enter your email address"
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
      />
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
