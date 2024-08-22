import Link from "next/link";
import { Button } from "./button";

export default function ProfileNotFound() {
    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="h-48 w-48 items-center justify-center flex flex-col">
                <div className="items-center flex justify-center flex-col select-none">
                <h1 className="text-6xl">🐱</h1>
                <h1 className="text-2xl">User not found</h1>
</div>
                <div className="mt-2 flex">
                    <Button size={'lg'} asChild>
                        <Link href='/'>Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}