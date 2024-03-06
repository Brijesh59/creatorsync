"use client";

import React, { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoJSProps {
  options: {
    sources: {
      src: string;
      type: string;
    }[];
    autoplay?: boolean;
    controls?: boolean;
    responsive?: boolean;
    fluid?: boolean;
  };
  onReady?: (player: any) => void;
}

export const VideoJS = ({ options, onReady }: VideoJSProps) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<any>(null);

  useEffect(() => {
    // Ensure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("video-js", "vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        options,
        function () {
          videojs.log("player is ready");
          onReady && onReady(player);
        }
      ));

      playerRef.current = player;
    } else {
      // Update player if options change
      const player = playerRef.current;

      if (player) {
        player.autoplay(options.autoplay ?? false);
        if (options.sources) {
          player.src(options.sources);
        }
      }
    }

    // Dispose the Video.js player when the component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, videoRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
