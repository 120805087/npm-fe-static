"use client";

import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { data } from "./data";
import { loadScript } from "../_lib/lib";

declare global {
  interface Window {
    polyvPlayer: any;
  }
}

function Detail() {
  const [player, setPlayer] = useState<any>();
  const [id, setId] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    if (id && Number(id) < 9) {
      setId(id);
      if (!window.polyvPlayer) {
        loadScript(
          "https://player.polyv.net/resp/vod-player/latest/player.js"
        ).then(() => {
          loadPlayer(id);
        });
      } else if (!player) {
        loadPlayer(id);
      }
    } else {
      notFound();
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const loadPlayer = (id: string) => {
    const play = window.polyvPlayer({
      wrap: ".player",
      width: "100%",
      height: 240,
      url: data[Number(id)].videoUrl,
      // loading_bg_img: data[Number(id)].coverImg,
      cover_display: "scaleAspectFill",
      skinLocation: 1,
      speed: false,
      showLine: false,
      video_align: "bottom",
      // hideRepeat: true,
    });

    setPlayer(play);
  };

  return (
    <div className="w-screen h-screen overflow-hidden sm:h-[750px]">
      <div className="m-auto h-full sm:w-[414px] relative">
        <div className="w-full sm:h-full absolute left-1/2 -translate-x-1/2">
          <div className="player h-[240px]"></div>
          <div
            className="mt-[-100px] pt-1 relative z-50 h-[calc(100vh-204px)] sm:h-[calc(750px-204px)]"
            style={{
              transform: "translateZ(50px)",
            }}
          >
            {id && (
              <div className="px-6 absolute z-50 top-[120px]">
                <Image
                  className="mt-5 m-auto"
                  src="/images/return_btn.png"
                  width={186}
                  height={58}
                  alt=""
                  onClick={() => router.push("/person")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
