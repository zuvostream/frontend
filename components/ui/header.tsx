import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Button, buttonVariants } from "./button"
import { ArrowLeft } from "lucide-react"
export default function Header() {
    return(
        <nav className="sticky  insert-x-0 top-0 z-30 border-b w-full h-14 backdrop-blur-lg transition-all ">
            <MaxWidthWrapper>
                 <div className="flex h-14 items-center justify-between border-b ">
                    <Link className="flex z-40 font-semibold transition-all hover:text-primary" href='/'>catpics</Link>
                   <Link href='/' className={buttonVariants({
                    variant: "default",
                    size: "sm"
                   })}> Get Started</Link>
                 </div>
            </MaxWidthWrapper>
        </nav>
    )
}