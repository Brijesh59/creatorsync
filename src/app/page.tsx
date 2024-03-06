import React from "react";
import VideoJS from "@/components/video-player";

export default function Home() {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://media-files.vidstack.io/720p.mp4",
        type: "video/mp4",
      },
    ],
  };

  return (
    <main className="">
      <VideoJS options={videoJsOptions} />
    </main>
  );
}
