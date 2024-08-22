'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaApple, FaDiscord } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    let [username, setUsername] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [isLoading, setLoading] = useState(false);
    let router = useRouter();

  let handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}v1/signin`, {
        method: 'POST',
        body: new URLSearchParams({
          username,
          password
        }),
        credentials: 'include',
      });

      let result = await response.json();
      if (result.success) {
        router.push(`/user/${username}`);
      } else {
        console.error('Failed to sign in:', result.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false); 
    }
  };

    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="border rounded-xl h-auto w-[350px] px-8 py-8 flex flex-col gap-4">
                <div className="flex-rol flex gap-4 w-full ">
                    <Button className="w-full" variant={'outline'} size={"lg"} asChild>
                        <Link href='http://localhost:8000/v1/account-link/discord'>
                            <FaDiscord className="h-6 w-6" />
                        </Link>
                    </Button>
                    <Button className="w-full" disabled variant={'outline'} size={"lg"}>
                        <FaApple className="h-6 w-6" />
                    </Button>
                </div>
                <div className="space-y-2">
                    <p className="text-base">Username<span className="text-red-500 select-none font-bold">*</span></p>
                    <Input type="text" disabled={isLoading} value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <p className="text-base">Password<span className="text-red-500 select-none font-bold">*</span></p>
                    <Input type="password" disabled={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button onClick={handle} disabled={isLoading} variant={"default"}>
                    Login
                </Button>
            </div>
        </div>
    );
}
