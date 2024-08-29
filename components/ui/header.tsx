'use client';
import { useEffect, useState } from "react";
import { Cog, CogIcon, Disc3 } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "./button";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

export default function Header() {
    let [isSuccess, setIsSuccess] = useState(false);
    let [avatar, setAvatar] = useState<string>();
    let [username, setUsername] = useState<string>();
    let router = useRouter();

    useEffect(() => {
        let getsession = async () => {
            try {
                let response = await fetch(`${API_URL}me`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                let data = await response.json();

                if (data.success) {
                    setIsSuccess(true);
                    setAvatar(data.user.Avatar);
                    setUsername(data.user.username);
                } else {
                    setIsSuccess(false);
                }
            } catch (error) {
                setIsSuccess(false);
            }
        };

        getsession();
    }, []);

    return (
        <nav className="sticky insert-x-0 top-0 z-30 border-b w-full h-14 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b">
                    <Link className="flex z-40 font-semibold transition-all hover:text-primary uppercase" href='/'>zuvo</Link>
                    {isSuccess ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={avatar} />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-2">
                                <DropdownMenuLabel>{username}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link className="flex items-center gap-x-2 align-middle" href={`/library`} passHref>
                                        <Disc3 className="w-4 h-4" />
                                        Library
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link className="flex items-center gap-x-2 align-middle" href={`/library`} passHref>
                                        <CogIcon className="w-4 h-4" />
                                        Library
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href='/register' className={buttonVariants({
                            variant: "default",
                            size: "sm"
                        })}>Get Started</Link>
                    )}
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}
