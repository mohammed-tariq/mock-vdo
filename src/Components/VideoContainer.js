import React, { useRef } from "react";
import VideoPlayer from './VideoPlayer'
import data from "../Data/data.json";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";

function ShortContainer() {
  const containerRef = useRef();

  return (
    <>
      <section ref={containerRef} className="video-container">
        {data.map((item) => (
          <VideoPlayer
            key={item.id}
            containerRef={containerRef}
            video={item}
          />
        ))}
      </section>

      <div className="navigation-container">
        <div
          onClick={() => {
            containerRef.current.scrollTo(
              0,
              containerRef.current.scrollTop - window.innerHeight
            );
          }}
          className="nav-up"
        >
          <FaArrowAltCircleUp />
          
        </div>
        <div
          onClick={() => {
            containerRef.current.scrollTo(
              0,
              containerRef.current.scrollTop + window.innerHeight
            );
          }}
          className="nav-down"
        >
<FaArrowAltCircleDown />

        </div>
      </div>
    </>
  );
}

export default ShortContainer;
