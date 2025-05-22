import React from "react";
import videoSrc from "../../assets/hsbc-in-korea-animation.mp4";

const Korea2 = () => {
  return (
    <div className="bg-white py-12 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-light mb-10 ">HSBC in Korea</h1>

      {/* Enlarged container with gray background */}
      <div className="bg-gray-200 p-10 rounded-xl shadow-xl flex justify-center">
        <video
          controls
          className="w-full max-w-6xl rounded-lg"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Korea2;
