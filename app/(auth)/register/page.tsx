'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaApple, FaDiscord, FaSpotify} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";
export default function Register() {
    let [username, setUsername] = useState<string>('');
    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [isLoading, setLoading] = useState(false);
    let router = useRouter();
    let handle = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const response = await fetch(`${API_URL}v1/register`, {
            method: 'POST',
            body: new URLSearchParams({
              username,
              email,
              password
            }),
            credentials: 'include',
          });
    
          let result = await response.json();
          if (result.success) {
            router.push(`/login`);
          } else {
            console.error('Failed to sign in:', result.message);
          }
        } catch (error) {
          console.error("Error signing in:", error);
        } finally {
          setLoading(false); 
        }
      };
    return(
        <div className="flex min-h-screen justify-center items-center">
                <div className="border rounded-xl h-auto w-[350px] px-8 py-8 flex flex-col gap-4">
                    <div className="flex-rol flex gap-4 w-full ">
                    <Button className="w-full" variant={'outline'} size={"lg"} asChild>
                      <Link href='http://localhost:8000/v1/account-link/discord'>  <FaDiscord className="h-6 w-6" /> </Link>
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
                        <p className="text-base">Email<span className="text-red-500 select-none font-bold">*</span></p>
                        <Input type="email" disabled={isLoading} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <p className="text-base">Password<span className="text-red-500 select-none font-bold">*</span></p>
                        <Input type="password" disabled={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                    <span className="text-xs">By registering you agree to our <Link className="hover:text-primary transition-all font-semibold" href='/'>Terms Of Service</Link> </span>
</div>
                <Button onClick={handle} disabled={isLoading} variant={"default"}>
                    Register
                </Button>
                </div>
        </div>
    )
}