import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function UserHeader() {
    return(
        <div className="w-full h-14 border-b">
            <MaxWidthWrapper>
                <div className="flex items-center space-x-4 h-full">
                  <Link href='/'>Feed</Link>
                </div>
</MaxWidthWrapper>
        </div>
    )
}