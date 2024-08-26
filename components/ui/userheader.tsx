import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function UserHeader() {
    let Links = [
        { label: 'Home', href: '/' },
    ]
    
    return(
        <div className="sticky insert-x-0 top-0 z-30 border-b w-full h-14 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex items-center space-x-4 h-full">
                {Links.map((link) => (
                        <Link key={link.href} href={link.href}>
                                {link.label}
                        </Link>
                    ))}
                </div>
</MaxWidthWrapper>
        </div>
    )
}