"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ListPage() {
  const router = useRouter();
  return (
    <div className="w-screen">
      <div className="m-auto sm:w-[414px] relative">
        <div className="py-3 px-3 grid grid-cols-2 gap-x-2 gap-y-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((it: number, index: number) => (
            <div className="mt-2 relative" key={it}>
              <Image
                src={`/images/return_btn.png`}
                width={337}
                height={315}
                alt="return_btn.jpg"
                loading="lazy"
              />
              <div
                className="w-full h-full absolute top-0 left-0 cursor-pointer"
                onClick={() => {
                  router.push(`/detail?id=${index}`);
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
