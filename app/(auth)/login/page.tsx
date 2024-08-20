'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaApple, FaDiscord, FaSpotify} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
    let [username, setUsername] = useState<string>('');
    let [password, setPassword] = useState<string>('');
     
    return(
        <div className="flex min-h-screen justify-center items-center">
                <div className="border rounded-xl h-auto w-[350px] px-8 py-8 flex flex-col gap-4">
                    <div className="flex-rol flex gap-4 w-full ">
                    <Button className="w-full" variant={'outline'} size={"lg"} asChild>
                       <Link href=''><FaDiscord className="h-6 w-6" /> </Link>
                    </Button>
                    <Button className="w-full" disabled variant={'outline'} size={"lg"}>
                        <FaApple className="h-6 w-6" />
                    </Button>
</div>
                    <div className="space-y-2">
                        <p className="text-base">Username<span className="text-red-500 select-none font-bold">*</span></p>
                        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <p className="text-base">Password<span className="text-red-500 select-none font-bold">*</span></p>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <Button variant={"default"}>
                        Register
                    </Button>
                </div>
        </div>
    )
}