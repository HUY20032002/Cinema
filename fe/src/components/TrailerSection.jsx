import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

function TrailerSection() {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  // Lấy ID từ URL YouTube (ví dụ: https://www.youtube.com/watch?v=WpW36ldAqnM)
  const getYouTubeId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v"); // lấy giá trị của tham số v
  };

  const videoId = getYouTubeId(currentTrailer.videoUrl);
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        <iframe
          className="mx-auto max-w-full"
          width="960px"
          height="540px"
          src={youtubeEmbedUrl}
          title="YouTube trailer player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="group grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className="relative cursor-pointer group-hover:opacity-50 hover:opacity-100 hover:-translate-y-1 duration-300 transition rounded-lg overflow-hidden"
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="rounded-lg w-full h-full object-cover brightness-75"
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-80 group-hover:opacity-100 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrailerSection;
