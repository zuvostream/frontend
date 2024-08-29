import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function UserHeader() {
    return (
        <nav className=" z-30 border-b w-full h-14 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between">
                    <Link className="flex z-40 font-semibold transition-all hover:text-primary uppercase" href='/'>
                        zuvo
                    </Link>
                    {/* Add other navbar items here */}
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}
