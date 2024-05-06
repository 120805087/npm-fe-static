import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden sm:h-[750px]">
      <div className="m-auto h-full sm:w-[414px] relative">
        <Link className="absolute left-0" href="/person">
          <Image
            className="inline-block"
            src="/images/return_btn.png"
            alt="封面图"
            width={371}
            height={116}
          />
        </Link>
      </div>
    </div>
  );
}
